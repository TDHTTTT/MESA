from recommendation import model
import numpy as np


# Trains model based on training data
classifier = model.MLClassifier()
X, Y = model.read_train_data("./data/data.csv")
classifier.train(X,Y)


def recommendResource(num_resources: int, query: [float]) -> [float]:
    """Gets recommendations from trained model based on query input"""
    # Find recommendations
    out = classifier.predict(query)

    # Use context to sort recommendation
    sorted_out = np.argsort(-out)

    # Return sorted recommendations
    return sorted_out[0:num_resources].tolist()

