import json
import  pandas as pd 
import requests
import sys
city = sys.argv[1]
covid_api="https://api.covid19api.com/summary"
a=pd.read_json(covid_api,lines=True)
df1=pd.DataFrame(a.pop('Global').tolist())
df=pd.DataFrame(a, columns=['Countries[]'])
da=pd.DataFrame(a)
b=[]
for i in da['Countries'][0:5]:
    for s in i:
        b.append(s)
    #print(b)
    db=pd.DataFrame(b)
    #print(db)
    india=db[101:102]
final=india[["Country","TotalConfirmed"]]
print(final)
sys.stdout.flush()
