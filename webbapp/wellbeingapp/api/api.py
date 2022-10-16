from flask import Flask, request, jsonify
app = Flask(__name__ )
from script import infeere
import io
from base64 import encodebytes
from PIL import Image


# the endpoint that front end uses to send the answeres for the Questions
@app.route('/api/v0/SendData', methods=['POST','GET'])
def get_current_time():
    print("here")
    data= request.get_json()['Data']
    result , BMU = infeere(data) # get the results of the Ryff diemensions , as wel la the best matching unit in the self organzing map for the current depression level
    print(result , BMU)

    # here all we do is that we convert the numpy datatype to integer after rounding the floating point and converting it to int
    a =  list(result[0])
    b = []
    for i in a :
        b.append(int(round(i))) 

    return {"result" : b , "BMU" : [int(BMU[0]) ,int(BMU[1])] } # jsonify the data and send it back in json format to the client (React application)

if(__name__ == "__main__"):
    app.run(debug=True)