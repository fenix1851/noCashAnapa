
from peewee import *
from playhouse.postgres_ext import PostgresqlExtDatabase
import random

from requests import request

try:
    db = PostgresqlDatabase(
        database="anapa",
        user="postgres",
        password="postgres",
        host='45.8.230.89',
        port=5432)

except:
    db = PostgresqlExtDatabase(
        database='anapa',
        user='postgres',
        password="postgres",
        host='45.8.230.89', 
        port=5432)

class BaseModel(Model):
    class Meta:
        database = db

class Users(BaseModel):
    
    phone = TextField(null=False, primary_key=True) # Номер телефона
    
    phone_ver = BooleanField(default=False) # Проверен?
    
    fio = TextField(default="Иванов Иван Иванович")
    
    type = TextField(null=False) # Тип пользователя
    
    coins = IntegerField(default=0) # Кол-во монеток
    
    avatar = BlobField(null=True)
    
    staff_pass = TextField(null=True)
    
    
class Beaches(BaseModel):
    
    beach_id = IntegerField(primary_key=True)
    
    name = TextField(null=False) # Название пляжа
    
    yandex_url = TextField(null=True)



class Hotels(BaseModel):
    
    hotel_id = IntegerField(primary_key=True)
    
    name = TextField()
    
    owner = ForeignKeyField(Users, null=True)
    
    rating = FloatField(default=random.uniform(0.0, 5.0))
    
    photopath = TextField()
    
    beach = ForeignKeyField(Beaches)

class Shops(BaseModel):
    
    shop_id = IntegerField(null=False, primary_key=True) # Айди магазина
    
    shop_name = TextField(default="Название магазина") # Название магазина
    
    owner:Users = ForeignKeyField(Users) # Владелец, ссылка на Пользователя
    
    beach:Beaches = ForeignKeyField(Beaches) # Пляж, ссылка на Пляжи
    
    online = BooleanField(default=False)
    
    coordinates = TextField(null=True)
    

class MarketPlaces(BaseModel):
    
    marketplace_id = IntegerField(primary_key=True)
    
    beach = ForeignKeyField(Beaches)
    
    owner = ForeignKeyField(Users)
    
    hotel = ForeignKeyField(Hotels)
    
class AllowedMarkets(BaseModel):
    
    allow_id = IntegerField(primary_key=True)
    
    marketplace = ForeignKeyField(MarketPlaces)
    
    shop = ForeignKeyField(Shops)
    
    is_allow = BooleanField(default=False)
    
class Categories(BaseModel): 
    
    id = IntegerField(primary_key=True)
    
    name = TextField(null=False)
    
class Goods(BaseModel):
    
    good_id = IntegerField(null=False, primary_key=True) # Айди товара
    
    shop:Shops = ForeignKeyField(Shops, null=True) # Магазин, ссылка на магазин
    
    description = TextField(null=True)
    
    name = TextField(null=False) # Наименование товара 
    
    cost = IntegerField(null=False) # Стоимость за 1 единицу товара
    
    category = ForeignKeyField(Categories)
    
    pathfile = TextField()
    
class Sells(BaseModel):
    
    sell_id = IntegerField(null=False, primary_key=True) # Айди покупки
    
    buyer = ForeignKeyField(Users) # Покупатель, ссылка на Пользователи
    
    seller = ForeignKeyField(Users) # Продавец, ссылка на Пользователи
    
    good = ForeignKeyField(Goods) # Товар, ссылка на Товары
    
    count = IntegerField(default=1) # Кол-во купленных товаров

    
class Bills(BaseModel):
    
    bill_id = IntegerField(null=False, primary_key=True) # Айди пополнения (в системе noCash)
    
    bill = TextField() # Айди в системе Qiwi
    
    is_payed = BooleanField(default=False) # Оплачен?
    
    user = ForeignKeyField(Users) # Пользователь, который пополняет, ссылка на Пользователи
    
    status = TextField(default="created") # Статус пополнения 
    
    coins = IntegerField() # Кол-во пополняемых монет

class Requests_of_help(BaseModel):
    
    request_id = IntegerField(null=False, primary_key=True)
    
    requestor = ForeignKeyField(Users)
    
    timestamp = IntegerField(null=False, primary_key=False)
    
    coordinates = TextField()
    
