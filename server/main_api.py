
import database, uvicorn

from time import sleep
from fastapi import FastAPI
from threading import Thread
from pyqiwip2p import QiwiP2P


# public = 48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iP5N1DQm9kcmd3NvtYcZ9wywCrbeF1WBxJyfTTTChotpMQR59ZgEDdBTbAf3hCV4nqpAw1KDYdH8kAW7Vrpsc4EwSucRqgXNdyMo9CLKSDt
# secret = eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6IjZhOGtxay0wMCIsInVzZXJfaWQiOiI3OTUyOTg3MjIwNyIsInNlY3JldCI6IjgzMzdkMzJjNjg5ZjNiYWRlYmExZjMyZWQ3MjE3YmNlOGVkOTliN2ViMmEyZTM3ZjgzNTNkMzE3MWU5ZmVhZGIifX0=

qiwi_api = QiwiP2P(auth_key="eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6IjZhOGtxay0wMCIsInVzZXJfaWQiOiI3OTUyOTg3MjIwNyIsInNlY3JldCI6IjgzMzdkMzJjNjg5ZjNiYWRlYmExZjMyZWQ3MjE3YmNlOGVkOTliN2ViMmEyZTM3ZjgzNTNkMzE3MWU5ZmVhZGIifX0=")

app = FastAPI()

@app.get("/api/v1/checkbalance")
async def checkbalance(phone):
    
    user:database.Users = database.Users.select().where((database.Users.phone == phone)).first()
    
    if user:
        return {"success": True, "balance": user.coins}
    
    else:
        return {"success": False, "message": "User not registered"}
    
@app.get("/api/v1/supp")
async def createbill(phone, coins):
    user:database.Users = database.Users.select().where((database.Users.phone == phone)).first()
    
    if user:
        
        bills = database.Bills.select()
        a = qiwi_api.bill(amount=coins, lifetime=60, comment="!ВЫБРАТЬ ТЕКСТ ВЫБРАТЬ!")
        
        if not bills:
            new_bill = database.Bills.create(bill_id = 1, bill = a.bill_id, user=user, coins=coins)
        else:
            new_bill_id = database.Bills.select().order_by(-database.Bills.bill_id).first().bill_id+1
            new_bill = database.Bills.create(bill_id = new_bill_id, bill = a.bill_id, user=user, coins=coins)

        new_bill.save()
        # Проверка на пополнение
        
        def checkingBill():
            while True:
                sleep(5)
                
                bill_status = qiwi_api.check(new_bill.bill).status
                
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
        return {"success": True, "message": "Bill has created", "bill": new_bill.bill, "url": a.pay_url}
    
    else:
        return {"success": False, "message": "User not exist"}
    
@app.get("/api/v1/getshops")
async def getshops(userphone, active, beach):        
    
    user:database.Users = database.Users.select().where((database.Users.phone == userphone)).first()
    
    if user:
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
        
    else:
        
        return {"success": False, "message": "User not registered"}
    
@app.get("/api/v1/getgoods")
async def getgoods(marketplace_id):        
    
    marketplace = database.Select().where((database.MarketPlace.marketplace_id == marketplace_id)).first()
    if marketplace:
        
        allowed_shops_in_marketplace = database.Select().where((database.AllowedMarkets.marketplace == marketplace))
        all_goods = [[good for good in database.Goods.select().where( (database.Goods.shop == shop) )] for shop in allowed_shops_in_marketplace]
        marketplace_goods = database.Goods.select().where((database.Shops.shop_id == -int(marketplace)))
        
        if marketplace_goods:
            all_goods += marketplace_goods 
        
        print(all_goods)
        
        return {"success": True}
    else:
        return {"success": False, "message": "Marketplace has not exist"}
    

@app.get("/api/v1/getbeaches")
async def getbeaches():        
    beaches = database.Beaches.select()
    if beaches:
        return {"success": True, "result": [{"id": beach.beach_id, "name": beach.name, "yandex": beach.yandex_url} for beach in beaches]}

    else:
        return {"success": False, "message": "beaches don't exist"}
    
    
@app.get("/api/v1/gethotels")
async def gethotels(beach_id):        
    beaches = database.Beaches.select()
    hotels = database.Hotels.select()
    
    if hotels and beaches:
        beach = database.Beaches.select().where( (database.Beaches.beach_id == beach_id) ).first()
        if beach:
            hotels = database.Hotels.select().where( (database.Hotels.beach == beach) ).first()
            if hotels:
                return {"success": True, "result": [{"id": hotel.hotel_id, "name": hotel.name, "owner": hotel.owner, "rating": hotel.rating, "photo": hotel.photo, "beach_id": hotel.beach} for hotel in hotels]}
            
            else:
                return {"success": False, "message": "On current beach no exist hotels"}
            
        else:
            return {"success": False, "message": "Current beach don't exist"}
        
    else:
        return {"success": False, "message": "beaches or hotels doesn't exist"}

def startCheckBills():
    unpaidedbills = database.Bills.select()


if __name__ == '__main__':
    uvicorn.run("main_api:app", port=8080, host='45.8.230.89', reload=True)