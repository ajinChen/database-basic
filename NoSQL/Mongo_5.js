use msds697

//Q1
db.business.find({$and:[{'cuisine':{$in:['Hamburgers','Americans']}},{"address.zipcode":'11225'}]}).count()

//Q2
db.business.find({'name':{$regex:'\w*ice cream\w*', $options:'i'}},{'_id':false, 'name':true}).sort({'name':-1}).limit(3).pretty()

//Q3
db.business.find({'address.coord':{$elemMatch:{$gte:100}}},{'_id':false,'address.coord':true,'name':true,'grades':{$elemMatch:{'grade':'A'}}}).sort({'name':1}).pretty()

//Q4
db.business.updateMany({'name':'Starbucks'},{$set:{'grades.$[elem].grade':'B'}},{arrayFilters:[{'elem.score':{$lt:10}}]})

//Q5
db.business.find({'name':'Starbucks'},{'_id':false, 'grades':true, 'restaurant_id':true}).sort({'restaurant_id':1}).limit(1).pretty()
                 
//Q6
db.business.drop()
