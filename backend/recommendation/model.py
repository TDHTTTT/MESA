from sklearn.naive_bayes import GaussianNB
import numpy as np

def read_train_data(file_name):
    f = open(file_name)
    data = np.loadtxt(f, delimiter=',', skiprows=1)

    X = data[:, 0:-1]
    Y = data[:, -1]
    print(Y)
    return X, Y

class MLClassifier:
    def __init__(self, classifier=GaussianNB()):
        self.classifier = classifier

    def train(self, features, target):
        self.classifier.fit(features, target)

    def predict(self, data):
        arr = np.asarray(data)
        return self.classifier.predict_proba(arr.reshape(1, -1))[0]
