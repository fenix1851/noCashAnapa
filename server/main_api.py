
from lib2to3.pgen2 import token
import database, uvicorn
from time import sleep
from fastapi import FastAPI
from threading import Thread
from fastapi.middleware.cors import CORSMiddleware
import  urllib
import http.client as httplib
token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIwOGU0MWIzYS1kMzMzLWEzYzYtNzkyZi02YjU5MDViMGExYjMiLCJ0aWQiOiJkMzkwNWQ3ZC04OTUwLTAyNzQtNjZmZS1lM2Q3ZmQwYWVkMDEifQ.loNoWLjb7JMifdXBZEXbRL3a0VPMMjDag_FXsS3kn4E"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/getuser")
async def getuser(phone):
    user = database.Users.select().where( (database.Users.phone == phone) ).first()
    if user:
        return {"success": True, "result": {"phone": phone, "phone_ver": user.phone_ver, "type": user.type, "coins": user.coins}}
    
    else:
        return {"success": False}

@app.get("/api/v1/registerPhone")
async def registershop(phonenumber, fio):
    if database.Users.select().where( (database.Users.phone == phonenumber) ).first():
        return {"success": False, "message": "User already registered"}
    
    else:
        newUser = database.Users.create(phone = phonenumber, phone_ver = True, type="client", fio = fio)
        newUser.save()
        
        return {"success": True}
        
        
 
@app.get("/api/v1/checkbalance")
async def checkbalance(phone):
    
    user:database.Users = database.Users.select().where((database.Users.phone == phone)).first()
    
    if user:
        return {"success": True, "balance": user.coins}
    
    else:
        return {"success": False, "message": "User not registered"}
    
@app.get("/api/v1/supp")
async def createbill(phone, coins, ref):
    user:database.Users = database.Users.select().where((database.Users.phone == phone)).first()
    bills = database.Bills.select()
    if user:
        
        headers = ["Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIwOGU0MWIzYS1kMzMzLWEzYzYtNzkyZi02YjU5MDViMGExYjMiLCJ0aWQiOiI0YjE1M2IyZS1iOGI4LTNhMDAtNDY4YS0xMzVmMzcyMTZjMDkifQ.FAdj7dR5_fZ5FwEIfq10z_hm7ZB8TrfO7UTscVA87mc"]
        
        params = urllib.urlencode({'wallet_to': "R10124288", 'sum': coins, 'success_url': ref})
        headers = {"Content-type": "application/x-www-form-urlencoded",
                    "Accept": "text/plain"}
        conn = httplib.HTTPConnection("api.lava.ru/invoice/create")
        conn.request("POST", "", params, headers)
        
        billCreate = InvoiceCreate(token, "R10124288", ref, comment="Пополнение Анапок")
        
        if not bills:
            new_bill = database.Bills.create(bill_id = 1, bill = billCreate["id"], user=user, coins=coins)
        else:
            new_bill_id = database.Bills.select().order_by(-database.Bills.bill_id).first().bill_id+1
            new_bill = database.Bills.create(bill_id = new_bill_id, bill = billCreate["id"], user=user, coins=coins)

        new_bill.save()
        # Проверка на пополнение
        
        def checkingBill():
            while True:
                sleep(5)
                
                bill_status = LavaAPI.check(new_bill.bill).status
                
                if bill_status == "PAID":
                    good_bill:database.Bills = database.Bills.select().where((database.Bills.bill_id == new_bill.bill_id)).first()
                    good_bill.is_payed = True
                    good_bill.save()
                    
                    user.coins += good_bill.coins
                    user.save()
                    break
                
                elif bill_status == "REJECTED":
                    new_bill.status = "REJECTED"
                    new_bill.save()
                    break
                
                elif bill_status == "EXPIRED":
                    new_bill.status = "EXPIRED"
                    new_bill.save()
                    break
                
                elif bill_status == "WAITING":
                    new_bill.status = "WAITING"
                    new_bill.save()
                    pass
            
        
        Thread(target=checkingBill).start()
        return {"success": True, "message": "Bill has created", "bill": billCreate["id"], "url": billCreate["url"]}
    
    else:
        return {"success": False, "message": "User not exist"}
      
@app.get("/api/v1/transfer")
async def transfer(phone_from, phone_to, coins):
    user_from = database.Users.select().where( ( database.Users.phone == phone_from ) ).first()
    user_to = database.Users.select().where(  ( database.Users.phone == phone_to ) ).first() 
    
    if user_from and user_to:
     
        if user_from.coins >= coins:
            user_from.coins -= coins
            user_to.coins += coins
            user_from.save()
            user_to.save()
            return {"success": True}
        
        else:
            return {"success": False, "message": "user from doesn't have need coins"}
            
    else:
        return {"success": False, "message": "user_from or user_to not exists"}


@app.get("/api/v1/getmarketplaceinfo")
async def getmarketplaceinfo(marketplace_id):
    
    mp:database.MarketPlaces = database.MarketPlaces.select().where( (database.MarketPlaces.marketplace_id == marketplace_id) ).first()
    
    if mp:
        alws = database.AllowedMarkets.select().where( (database.AllowedMarkets.marketplace == mp) &
                                                      (database.AllowedMarkets.is_allow == True))
        return {
            "data": 
            {
                "beach_id": mp.beach, "owner_phone": mp.owner, "hotel_id": mp.hotel
            },
            
            "allows": [{ "allow_id": x.allow_id, "mp_id": x.marketplace, "shop_id": x.shop, "is_allow": x.is_allow } for x in alws if alws]
        }
    
    else:
        return {"success": False, "message": "mp not exists"}

@app.get("/api/v1/registermp")
async def registermp(phonenumber, hotel_id):
    user = database.Users.select().where( (database.Users.phone == phonenumber) ).first()
    hotel = database.Hotels.select().where( (database.Hotels.hotel_id == hotel_id) ).first()
    if user and hotel:
        beach = database.Beaches.select().where( (database.Beaches.beach_id == hotel.beach_id) ).first()
        
        if not database.MarketPlaces.select(): nshop = database.MarketPlaces.create( marketplace_id = 0, beach = beach, owner = user, hotel = hotel)
        
        else: nshop = database.MarketPlaces.create( marketplace_id = database.MarketPlaces.select().order_by(-database.MarketPlaces.marketplace_id).first().shop_id+1, beach = beach, owner = user, hotel = hotel)
        
        nshop.save()
        
        return {"success": True, "message": ""}
        
    else:
        return {"success": False, "message": "This user OR hotel not exist"}



@app.get("/api/v1/getshopinfo")
async def getshopinfo(shop_id):
    
    shop = database.Shops.select().where( ( database.Shops.shop_id == shop_id ) ).first()
    
    if shop:
        return {"success": True, "result": {"shop_id": shop.shop_id, "shop_name": shop.shop_name, 
                                            "owner_phone": shop.owner, "beach_id": shop.beach, 
                                            "online": shop.online, "coordinates": shop.coordinates}}
    
    else:
        return {"success": False, "message": "shop not exists"}

@app.get("/api/v1/getallshops")
async def getallshops(active, beach):        
    
    if not database.Beaches.select():
        return {"success": False, "message": "No-one beach registered"}
    
    if not database.Shops.select():
        return {"success": False, "message": "No-one shop registered"}
    
    if not active in ["online", "offline", "all"]:
        return {"success": False, "message": "Incorrect status! \"online\", \"offline\", \"all\""}
    
    if not beach in [str(x.beach_id) for x in database.Beaches.select()].append("all"):
        return {"success": False, "message": "Incorrect beach name!"}
    
    
    if beach == "all":
        if active == "online":
            
            shops = database.Shops.select().where( (database.Shops.online == True) )

        elif active == "offline":

            shops = database.Shops.select().where( (database.Shops.online == False) )

        else:

            shops = database.Shops.select()
    
    elif database.Beaches.select().where(( database.Beaches.beach_id == int(beach) )):
        if active == "online":
            
            shops = database.Shops.select().where( (database.Shops.online == True) &
                                                   (database.Shops.beach == int(beach)))
        
        elif active == "offline":
            
            shops = database.Shops.select().where( (database.Shops.online == False) &
                                                   (database.Shops.beach == int(beach) ))
        
        else:
            
            shops = database.Shops.select((database.Shops.beach == int(beach)))
    
    
    if shops:
        
        return {"success": True, "sellers": [{"shop_name": x.shop_name, "owner": x.owner} for x in shops]}

    else:
        
        return {"success": False, "message": "Not have any sellers in system"}
    
@app.get("/api/v1/registershop")
async def registershop(phonenumber, shop_name, beach_id):
    user = database.Users.select().where( (database.Users.phone == phonenumber) ).first()
    beach = database.Beaches.select().where( (database.Beaches.beach_id == beach_id) ).first()
    
    if user and beach:
        if user.type == "Seller":
            if not database.Shops.select(): nshop = database.Shops.create( shop_id = 0, shop_name = shop_name, beach = beach)
            
            else: nshop = database.Shops.create( shop_id = database.Shops.select().order_by(-database.Shops.shop_id).first().shop_id+1, shop_name = shop_name, beach = beach)
            
            nshop.save()
            
        
            return {"success": True, "shop_id": nshop.shop_id}
        else:
            return {"success": False, "message": "This user doesn't have any permissions"}
    
    else:
        return {"success": False, "message": "This user OR beach not exist"}

    
    
    
@app.get("/api/v1/getallgoods")
async def getallgoods(marketplace_id):        
    
    marketplace = database.Select().where((database.MarketPlaces.marketplace_id == marketplace_id)).first()
    if marketplace:
        
        allowed_shops_in_marketplace = database.Select().where((database.AllowedMarkets.marketplace == marketplace))
        all_goods = [[good for good in database.Goods.select().where( (database.Goods.shop == shop) )] for shop in allowed_shops_in_marketplace]
        marketplace_goods = database.Goods.select().where((database.Shops.shop_id == -int(marketplace)))
        
        if marketplace_goods:
            all_goods += marketplace_goods 
        
        print(all_goods)
        
        return {"success": True, "result": { [{"name": good.name, "description": good.description, 
                                               "cost": good.cost, "category": good.category, "shop_id": good.shop,
                                               "imagebase64": open(good.pathfile, mode="rb").read()} for good in all_goods] } }
        
        
        
        
    else:
        return {"success": False, "message": "Marketplace has not exist"}
    
@app.get("/api/v1/getgoodbyid")
async def getgoodbyid(good_id):
    good = database.Goods.select().where( ( database.Goods.good_id == good_id ) ).first()
    if good:
        return {"success": True, "result": {"name": good.name, "description": good.description, 
                                               "cost": good.cost, "category": good.category, "shop_id": good.shop,
                                               "imagebase64": open(good.pathfile, mode="rb")}}
    
    else:
        return {"success": False, "message": "This good not exists"}

@app.get("/api/v1/getcategories")
async def getcategories(): return {"success": True, "resultat": [{"id": z.id, "name": z.name} for z in database.Categories.select()]}




@app.get("/api/v1/getallbeaches")
async def getallbeaches():        
    beaches = database.Beaches.select()
    if beaches:
        return {"success": True, "result": [{"id": beach.beach_id, "name": beach.name, "yandex": beach.yandex_url} for beach in beaches]}

    else:
        return {"success": False, "message": "beaches don't exist"}
    

@app.get("/api/v1/GetAllHotelsByBeach")
async def GetAllHotelsByBeach(beach_ids):
    beach_ids = [int(x) for x in beach_ids.split(";")]       
    beaches = database.Beaches.select()
    hotels = database.Hotels.select()
    
    if hotels and beaches:
        needed_hotels = [database.Hotels.select().where( ( database.Hotels.beach == x ) ) for x in beach_ids]
        nneeded_hotels = []
        for hotels in needed_hotels:
            for hotel in hotels:
                nneeded_hotels.append(hotel)
    
        print(nneeded_hotels)
        
        return {"success": True, "result": [{"hotel_id": hotel.hotel_id, "name": hotel.name, "owner": hotel.owner, "rating": hotel.rating, "beach": hotel.beach } for hotel in nneeded_hotels]}  #, "photobase64": base64.b64encode(open(hotel.photopath, "rb").read())
    else:
        return {"success": False, "message": "beaches or hotels doesn't exist"}


@app.get("/api/v1/staff/login")
async def staffLogin(phone, passw_md5):
    user = database.Users.select().where( ( database.Users.phone == phone ) &
                                          ( database.Users.staff_pass == passw_md5 ) )
    
    if user:
        return {"success": True}
    
    else:
        return {"success": False, "message": "something incorrect"}





if __name__ == '__main__':
    uvicorn.run("main_api:app", port=8080, host='45.8.230.89', reload=True, timeout_keep_alive=0)