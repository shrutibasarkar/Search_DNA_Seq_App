from django.shortcuts import render, HttpResponse,redirect
from django.contrib import messages
from django.core import serializers
from .utility import valid_sequence, getBlast
from rest_framework import generics, status, viewsets
from .models import Query, Result
from .serializers import QuerySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

class IndexView(generics.ListCreateAPIView):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer

# Result Serializer is not being used so we can remove it from the code 
@api_view(['GET'])
def getResults(request):
    # gets data from database
    resultSet = Result.objects.all().order_by('-date_submitted')
    # serialize the data
    serialized = serializers.serialize("json", resultSet, fields=('id', 'sseqid',"date_submitted", "user_input",'bitscore', 'sstart', 'salltitles'))
    return Response(serialized, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def createBlast(request):
    dna_seq = request.data
    # print("Submitted dna sequence:",dna_seq))
    if not dna_seq:
        print("no DNA seq")
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    dna_seq = valid_sequence(dna_seq)
    if dna_seq == False:
        print("not a valid DNA seq")
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        print("valid DNA seq")
        blast_res = getBlast(seq=dna_seq, db="/blastDB/Nucl")
        print("views blast_res", blast_res)           
        return Response(status=status.HTTP_201_CREATED)
    
