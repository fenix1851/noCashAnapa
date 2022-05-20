
from peewee import *
from playhouse.postgres_ext import PostgresqlExtDatabase

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
    
    phone = TextField(null=False, unique=True)
    phone_ver = BooleanField(default=False)
    type = TextField(null=False)
    
    coins = IntegerField(null=False)
    
class Shops(BaseModel):
    
    shop_id = TextField(null=False, unique=True)
    shop_name = TextField(default="Название магазина")
    owner:Users = ForeignKeyField(Users)
    
class Goods(BaseModel):
    good_id = IntegerField(null=False, unique=True)

    shop:Shops = ForeignKeyField(Shops)
    name = TextField(null=False)
    cost = IntegerField(null=False)
    
class Sells(BaseModel):
    sell_id = IntegerField(null=False, unique=True)
    
    buyer = ForeignKeyField(Users)
    seller = ForeignKeyField(Users)
    good = ForeignKeyField(Goods)
    
    count = IntegerField(default=1)

class Categories(BaseModel):
    category = TextField(null=False, unique=True)
    
class Bills(BaseModel):
    bill_id = IntegerField(null=False, unique=True)
    bill= TextField()
    is_payed = BooleanField(default=False)
    user = ForeignKeyField(Users)
    status = TextField(default="created")
    coins = IntegerField()