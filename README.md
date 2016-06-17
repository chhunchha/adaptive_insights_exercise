# Adaptive Insights - Pre employment Technical Screening - Engineering

**Sumant Chhunchha**
**mr.chhunchha@gmail.com**
**https://github.com/chhunchha/adaptive_insights_exercise/**
Single page application which shows answers/implementation for all 4 problem statements. 
Implemented using Angular, Bootstrap and Node.


```
> cd adaptive_insights
> npm install
> node server.js

http://localhost:3000/
```

## Problem 1

```javascript
var data = {  
        "id": 1,
        "label": "A",
        "children": [  
            {  
                "id": 2,
                "label": "B",
                "children": [  
                    {  
                        "id": 5,
                        "label": "E"
                    },
                    {  
                        "id": 6,
                        "label": "F"
                    },
                    {  
                        "id": 7,
                        "label": "G"
                    }
                ]
            },
            {  
                "id": 3,
                "label": "C"
            },
            {  
                "id": 4,
                "label": "D",
                "children": [  
                    {  
                        "id": 8,
                        "label": "H"
                    },
                    {  
                        "id" : 9,
                        "label" : "I"
                    }
                ]
            }
        ]
    };
```


## Problem 2

Click on Get Data button which will send Get request to get data.
You should see data below button in pretty json format

Have added extra node with id: 100 for problem 3 


## Problem 3

Input node id in text field and click find button next to it.
It will display appropriate output below text field.

###Test:

####Case 1: Node found and label found

Input  > 3

Output > Found label : C for node with Id : 3

####Case 2: Node not found

Input  > 10

Output > Couldn't find node with Id : 10

####Case 3: Node found but no label

Input > 100

Output > No label found for node with Id : 100


## Problem 4

Have used Angular framework for implementation. Two way binding provides easy way to manage data.

Also provides validators for form like prestine, touched, dirty etc.

for showing messages have used ng-messages, where is provides easy implementation to display different message based on error.

### Test:

Case 1: Click OK without changing anything in form.

Output > All fields which are required will show red border and message below input box to show that they are invalid


Case 2: Type few letters in name text field, delete those and click on next inputbox

Output > Name field will show red border showing that it is invalid and error message will show the message.


Similar behavior will be for Address1, City, State and Zip Code fields.


Case 3: Click cancel after form is filled

Output > All the fields will be clear and if there was any error shown for field will also reset.