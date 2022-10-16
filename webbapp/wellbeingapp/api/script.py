import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import cv2
from collections import Counter
from scipy.stats import bernoulli


import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import cv2
from keras.models import Sequential, model_from_json
from keras.layers import Conv2D , Dense, Dropout, Flatten, Lambda, ELU, MaxPooling2D , ReLU , MaxPool2D
from keras.regularizers import l2
from keras.callbacks import ModelCheckpoint, EarlyStopping, TensorBoard
from tensorflow.keras.optimizers import Adam


import argparse
import base64
from datetime import datetime
import os
import shutil
import math
import cv2
import numpy as np
import socketio
import eventlet
import eventlet.wsgi
from PIL import Image
from flask import Flask
from io import BytesIO
import matplotlib.pyplot as plt
from keras.models import load_model
import h5py
from keras import __version__ as keras_version
import pickle

MIDUS2DATAFILE = 'MIDUS_2_DATA.tsv'
MIDUS1DATAFILE = 'MIDUS_1_DATA.tsv'
MIDUS_2_Data = pd.read_csv(MIDUS2DATAFILE, sep='\t')
MIDUS_1_Data = pd.read_csv(MIDUS1DATAFILE, sep='\t')
MIDUS_1_Data

model = load_model('final models future wellbeing/model-337-2.6285')
with open('som.p', 'rb') as infile:
    som = pickle.load(infile)
merged_data = pd.merge(MIDUS_1_Data , MIDUS_2_Data , on = "M2ID" , how="inner")
merged_data

variables = [
    'A1SPWBR',
    'B1SPWBR1',
    'A1SPWBS',
    'B1SPWBS1',
    'A1SPWBA',
    'B1SPWBA1',
    'A1SPWBG',
    'B1SPWBG1',
    'A1SPWBE',
    'B1SPWBE1',
    'A1SPWBU',
    'B1SPWBU1',
    'A1PDEPAD',
    'B1PDEPAD',
    'A1PDEPDX',
    'B1PDEPDX',
    
    'A1PD1',
    'A1SF1C',
    'A1SF1D',
    'A1SF1F',
    'A1SF1I',
    'A1SF1K',
    'A1SF1L',
    'A1SF1M',
    'A1SF1U',
    'A1SF1X',
    'A1SF1Y',
    'A1SF1Z',
    'A1SF3B',
    'A1SF3P',
    'A1SF3Q',
    'A1SF3T',
    'A1SF3W',
    'A1SF4A',
    'A1SF4D',
    'A1SF4Y',
    'A1SF4Z',
    'A1SK10A',
    'A1SK17A',
    'A1SK17F',
    'A1SK17G',
    'A1SK17J',
    'A1SK17M',
    'A1SK17N',
    'A1SK7I',
    'A1SK7Q',
    'A1SM13',
    'A1SM5',
    
]


merged_data.drop(merged_data.columns.difference(variables), 1, inplace=True)

features = [
    'A1PD1', # Satisfied with life at present
    'A1SF1C', # Some wander aimlessly, but not me
    'A1SF1D',# Demands of everyday life often get me down
    'A1SF1F', # Maintaining close relationships difficult
    'A1SF1I', # Good managing daily responsibilities
    'A1SF1K', # Life process of learning/changing/growth
    'A1SF1L', # Experience challenge how think important
    'A1SF1M', # Others describe me as giving/share time
    'A1SF1U', # Do just about anything I set my mind to
    'A1SF1X', # When really want something, find way
    'A1SF1Y', # Many things interfere with what I want do
    'A1SF1Z', # Whether I get what want is in own hands
    'A1SF3B', # Do what can to change for better
    'A1SF3P', # Know what I want out of life
    'A1SF3Q', # I live one day at a time
    'A1SF3T', # Helpful to set goals for near future
    'A1SF3W', # No use in thinking about past because nothing can be done
    'A1SF4A', # Outgoing describes you how well
    'A1SF4D', # Organized describes you how well
    'A1SF4Y', # Broad minded describes you how well
    'A1SF4Z', # Sympathetic describes you how well
    'A1SK10A', # Give spouse/partner emotional support (hours/month)
    'A1SK17A', # World is too complex for me
    'A1SK17F', # Feel close to others in community
    'A1SK17G', # Daily activities not worthwhile for community
    'A1SK17J', # People do not care about others problems
    'A1SK17M', # Society not improving for people like me
    'A1SK17N', # Believe people are kind
    'A1SK7I', # Serve on a jury if called
    'A1SK7Q', # Volunteer for social causes
    'A1SM13', # Rely on friends for help with problem
    'A1SM5', # Open up to family about worries
]

targets = [
    'A1SPWBR',
    'B1SPWBR1',
    'A1SPWBS',
    'B1SPWBS1',
    'A1SPWBA',
    'B1SPWBA1',
    'A1SPWBG',
    'B1SPWBG1',
    'A1SPWBE',
    'B1SPWBE1',
    'A1SPWBU',
    'B1SPWBU1',
    'A1PDEPAD',
    'B1PDEPAD',
    'A1PDEPDX',
    'B1PDEPDX',
]
well_being_target_future = [
    'B1SPWBR1',
    'B1SPWBS1',
    'B1SPWBA1',
    'B1SPWBG1',
    'B1SPWBE1',
    'B1SPWBU1',
]
well_being_target_currnet = [
    'A1SPWBR',
    'A1SPWBS',
    'A1SPWBA',
    'A1SPWBG',
    'A1SPWBE',
    'A1SPWBU',
]


delete_columns = well_being_target_future + features  + ['A1PDEPAD','B1PDEPAD','A1PDEPDX','B1PDEPDX',]
for column_name in delete_columns  : 
    dropIndex = merged_data[( merged_data[column_name] == -1 ) ].index
    merged_data.drop(dropIndex , inplace=True)
    
    
from sklearn.preprocessing import MinMaxScaler
MinMaxScaler_Feature = {}
for feature in features:
    scaler = MinMaxScaler()
    scaler.fit(np.array(merged_data[feature]).reshape(-1,1))
    MinMaxScaler_Feature[feature] = scaler
    merged_data[feature] = scaler.transform(np.array(merged_data[feature]).reshape(-1,1))


def infeere(data):
    normalized_data = []
    for feature in features:
       normalized_data.append(MinMaxScaler_Feature[feature].transform(np.array([data[feature]]).reshape(-1,1))[0][0])

    normalized_data = np.array(normalized_data) 
    BMU = som.winner(normalized_data)
    result = model.predict(normalized_data.reshape(1,-1))

    print(type(result))
    return [result , BMU] 