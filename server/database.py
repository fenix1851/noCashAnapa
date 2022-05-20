
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
    
    phone = TextField(null=False, unique=True) # Номер телефона
    
    phone_ver = BooleanField(default=False) # Проверен?
    
    type = TextField(null=False) # Тип пользователя
    
    coins = IntegerField(null=False) # Кол-во монеток
    
    avatar = BlobField()
    
    online = BooleanField(default=False)
    
    
class Beaches(BaseModel):
    
    name = TextField(unique=True) # Название пляжа
    
class Shops(BaseModel):
    
    shop_id = TextField(null=False, unique=True) # Айди магазина
    
    shop_name = TextField(default="Название магазина") # Название магазина
    
    owner:Users = ForeignKeyField(Users) # Владелец, ссылка на Пользователя
    
    beach:Beaches = ForeignKeyField(Beaches) # Пляж, ссылка на Пляжи
    
    
class Goods(BaseModel):
    
    good_id = IntegerField(null=False, unique=True) # Айди товара
    
    shop:Shops = ForeignKeyField(Shops) # Магазин, ссылка на магазин
    
    name = TextField(null=False) # Наименование товара 
    
    cost = IntegerField(null=False) # Стоимость за 1 единицу товара
    
    
class Sells(BaseModel):
    
    sell_id = IntegerField(null=False, unique=True) # Айди покупки
    
    buyer = ForeignKeyField(Users) # Покупатель, ссылка на Пользователи
    
    seller = ForeignKeyField(Users) # Продавец, ссылка на Пользователи
    
    good = ForeignKeyField(Goods) # Товар, ссылка на Товары
    
    count = IntegerField(default=1) # Кол-во купленных товаров

class Categories(BaseModel): 
    
    category = TextField(null=False, unique=True) # Категории, Еда, Шлёпанцы, Услуги и тд
    
class Bills(BaseModel):
    
    bill_id = IntegerField(null=False, unique=True) # Айди пополнения (в системе noCash)
    
    bill= TextField() # Айди в системе Qiwi
    
    is_payed = BooleanField(default=False) # Оплачен?
    
    user = ForeignKeyField(Users) # Пользователь, который пополняет, ссылка на Пользователи
    
    status = TextField(default="created") # Статус пополнения 
    
    coins = IntegerField() # Кол-во пополняемых монет
    


    