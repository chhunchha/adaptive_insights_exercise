var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    engines = require('consolidate'),
    assert = require('assert');

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render("error_template", { error: err});
}

app.get('/data', function(req, res, next) {
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
            },
            {  
                "id": 100
            }
        ]
    };
    res.json(data);
});

app.use(errorHandler);
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
})
