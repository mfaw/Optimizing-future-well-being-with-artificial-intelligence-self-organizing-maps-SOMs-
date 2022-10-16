from flask import Flask, request, jsonify
app = Flask(__name__ )
from script import infeere
import io
from base64 import encodebytes
from PIL import Image


@app.route('/api/v0/SendData', methods=['POST','GET'])
def get_current_time():
    print("here")
    data= request.get_json()['Data']
    result , BMU = infeere(data)
    print(result , BMU)
    a =  list(result[0])
    b = []
    for i in a :
        b.append(int(round(i)))
    return {"result" : b , "BMU" : [int(BMU[0]) ,int(BMU[1])] }

if(__name__ == "__main__"):
    app.run(debug=True)