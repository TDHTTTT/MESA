# import argparse
from flask_restful import Resource, reqparse
from recommendation import model
import numpy as np

classifier = model.MLClassifier()
X, Y = model.read_train_data("./data/data.csv")
classifier.train(X,Y)


class RecommendationResource(Resource):
    def get(self):
        parser = reqparse.RequestParser()

        parser.add_argument("num_resources", type=int)
        parser.add_argument('query')
        # parser.add_argument('context')

        # Parse argument
        user_query = parser.parse_args()
        num_resources = user_query['num_resources']
        query = [float(x) for x in user_query['query'][1:-1].split(',')]
        # context = [float(x) for x in user_query['context'][1:-1].split(',')]
        
        # Find recommendations
        out = classifier.predict(query)

        # Use context to sort recommendation
        sorted_out = np.argsort(-out)

        # Return sorted recommendations
        return sorted_out[0:num_resources].tolist()
