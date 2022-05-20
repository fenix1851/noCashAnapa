from database import *

for table in [ Sells, Goods, Shops, Bills, Users]:
    table:Users
    table.drop_table()
    
for table in [Users, Bills, Shops, Goods, Sells]:
    table:Users
    table.create_table() 
    
test = Users.create(phone="79529872207", phone_ver=True, type="Buyer", coins=5000)
test.save()