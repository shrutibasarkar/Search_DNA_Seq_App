from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from django.core import serializers
from .utility import valid_sequence, getBlast
from rest_framework import generics, status, viewsets
from .models import Query, Result
from rest_framework.decorators import api_view
from rest_framework.response import Response

"""gets data from database and serialize the data"""


@api_view(['GET'])
def getResults(request):
    resultSet = Result.objects.all().order_by('-date_submitted')
    serialized = serializers.serialize("json", resultSet, fields=(
        'id', 'sseqid', "date_submitted", "user_input", 'bitscore', 'sstart', 'salltitles'))
    return Response(serialized, status=status.HTTP_200_OK)


"""creates blast and store results in database"""
@api_view(['POST'])
def createBlast(request):
    dna_seq = request.data
    if not dna_seq:
        print("No DNA seq")
        return Response(status=status.HTTP_400_BAD_REQUEST)
    dna_seq = valid_sequence(dna_seq)
    if dna_seq == False:
        print("Not a valid DNA seq")
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        print("Valid DNA seq")
        blast_res = getBlast(seq=dna_seq, db="/blastDB/Nucl")
        return Response(status=status.HTTP_201_CREATED)
