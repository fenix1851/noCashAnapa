import os
from shutil import copy
import shutil
from need_massives import *
from database import *

for table in [ Bills, Categories, Sells, Goods, AllowedMarkets, MarketPlaces, Shops, Hotels, Beaches, Users ]:
    print("Try table ", table)
    try:
        
        table:Users
        table.drop_table(cascade=True)
    except: 
        print("ERROR ERROR", table)


for table in [ Categories, Users, Beaches, Hotels,  Shops, MarketPlaces, AllowedMarkets, Goods, Sells, Bills]:
    table:Users
    table.create_table() 
    
    
test = Users.create(phone="1", phone_ver=True, type="Buyer", coins=5000)
test.save()

for index, cat_name in enumerate(["На мангале", "Фрукты", "Овощи", "Фаст-фуд", "Напитки", "Сладости"]):
    a = Categories.create(id=index, name=cat_name)
    a.save()

shutil.rmtree('./assets/pictures/hotels/', ignore_errors=True)
os.mkdir("./assets/pictures/hotels/")

for index, hotel_data in enumerate( os.listdir("./assets/pictures/raw_hotels") ):
    
    hotel_obj = {"beach_name": hotel_data.split("_")[1], "name": hotel_data.split("_")[0], "yandex_url": ""}
    path_to = "./assets/pictures/hotels/" + str(index) + "." + hotel_data.split(".")[1]
    
    copy("./assets/pictures/raw_hotels/" + hotel_data, path_to)
    
    beach = Beaches.select().where( (Beaches.name == hotel_obj["beach_name"]) ).first()
    
    if not beach:
        if not Beaches.select():
            beach = Beaches.create(beach_id = 0, name = hotel_obj["beach_name"], yandex_url = hotel_obj["yandex_url"])
            
        else:
            beach = Beaches.create(beach_id = Beaches.select().order_by(-Beaches.beach_id).first().beach_id+1, name = hotel_obj["beach_name"], yandex_url = hotel_obj["yandex_url"])
    
    if not Hotels.select():
        nb = Hotels.create(hotel_id = 0, name = hotel_obj["name"], photopath = path_to, beach=beach)
    
    else:
        nb = Hotels.create(hotel_id = Hotels.select().order_by(-Hotels.hotel_id).first().hotel_id+1, name = hotel_obj["name"], photopath = path_to, beach=beach)
    
    nb.save()
    


shutil.rmtree('./assets/pictures/goods/', ignore_errors=True)
os.mkdir("./assets/pictures/goods/")

for index, food_data in enumerate( os.listdir("./assets/pictures/raw_food") ):

    category = Categories.select().where( (Categories.id == int(food_data.split("_")[1])) ).first()
    
    
    food_obj = {"beach_name": food_data.split("_")[1], "name": food_data.split("_")[0], "yandex_url": "", "category": category}
    path_to = "./assets/pictures/goods/" + str(index) + "." + food_data.split(".")[1]
    
    
    if not Goods.select():
        nb = Goods.create(good_id = index, name = food_obj["name"], cost = 100, category = category)
    
    else:
        nb = Goods.create(good_id = Goods.select().order_by(-Goods.good_id).first().good_id+1, name = food_obj["name"], cost = 100, category = category)
    
    nb.save()
    
    copy("./assets/pictures/raw_food/" + food_data, path_to)