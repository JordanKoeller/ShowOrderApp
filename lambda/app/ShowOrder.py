try:
  import unzip_requirements
except ImportError:
  pass

import json

import numpy as np

from sorter import checkMany


def lambda_handler(event, context):
  context.log("====================BEGIN TRANSACTION========================\n")
  context.log("========================REQUEST==============================\n")
  context.log(event)
  context.log("\n")
  body = json.loads(event['body'])
  lookup = np.array(body['collisions'], dtype=np.uint8)
  frozens = np.array(body['frozen'], dtype=np.uint8)
  numIterations = body['iterCount']
  collisions, best = checkMany(lookup, numIterations, frozens)
  response = {
    "isBase64Encoded": False,
    "statusCode": 200,
    "headers": {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
    },
    "body": json.dumps({'minCollisions': collisions, 'order': list(best)})
  }
  context.log("========================RESPONSE=============================\n")
  context.log(response)
  context.log("\n")
  context.log("======================END TRANSACTION========================\n")
  return response
