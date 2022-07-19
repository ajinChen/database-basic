// https://docs.mongodb.com/v4.0/reference/operator/aggregation/

use msds697

// Q1
db.business.aggregate([{$unwind: '$grades'},
                       {$match: {'grades.grade':{$ne:'Not Yet Graded'}}},
                       {$group: {_id: {}, 'min': {$min: '$grades.score'}, 'max': {$max: '$grades.score'}}},
                       {$project:{'_id':false, 'min':{$convert: {input:'$min', to: 'int'}}, 'max':{$convert: {input:'$max', to: 'int'}}}}]).pretty()


// Q2
db.business.aggregate([{$group: {_id :"$cuisine", count:{$sum:1}}},
                       {$project: {'cuisine':'$_id', '_id':false, 'count':true}},
                       {$sort: {'count':-1}},
                       {$limit: 5}]).pretty()


// Q3
db.business.aggregate([{$sort: {'address.zipcode':1, 'address.street':1, 'address.building':1, 'address.coord':1}},
                       {$group: {_id:'$name', address_list: {$push: '$address'}, count:{$sum:1}}},
                       {$sort:{'count':-1}},
                       {$limit:1},
                       {$project: {'name':'$_id', '_id':false, 'address_list':true, 'count':true}}]).pretty()


// Q4
db.business.aggregate([{$unwind: '$grades'},
                       {$group: {_id :"$grades.date", count:{$sum:1}}},
                       {$project: {'date':'$_id', '_id':false, 'count':true}},
                       {$sort: {'count':-1}},
                       {$limit: 5}]).pretty()
                       