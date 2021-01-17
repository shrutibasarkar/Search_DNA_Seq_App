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
    
# class ResultView(viewsets.ModelViewSet):
#     resultset = Result.objects.all()
#     serializer_class = ResultSerializer


@api_view(['GET'])
def getResuts(request):
    resultSet = Result.objects.all()
    # hello = ResultSerializer
    # hello = ResultSerializer
    serialized = serializers.serialize("json", resultSet, fields=('id', 'query', 'sseqid', 'sstart', 'send'))
    print('hello', serialized)
    return Response(status=status.HTTP_201_CREATED)
    
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
        return Response(status=status.HTTP_201_CREATED)
    
