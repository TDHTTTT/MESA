from flask import Flask
from flask_restful import Api
from recommendation import RecommendationResource as rr

app = Flask(__name__)
api = Api(app)

api.add_resource(rr.RecommendationResource, '/recommendation/')

if __name__ == '__main__':    
    # Start the server
    app.run(host='0.0.0.0', debug=True)
