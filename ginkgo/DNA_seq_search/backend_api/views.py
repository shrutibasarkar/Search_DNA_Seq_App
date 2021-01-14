from django.shortcuts import render,HttpResponse,redirect
from django.contrib import messages
from .utility import valid_sequence, prepare
from rest_framework import generics, status
from .models import Query
from .serializers import QuerySerializer
from rest_framework.decorators import api_view



# Create your views here.

class IndexView(generics.ListCreateAPIView):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer

# def home(request):
#     return HttpResponse("hello")


@api_view(['POST'])
def getDNA(request):
    dna_sequence = request.data
    print("Submitted dna sequence: {}".format(dna_seq))
    if not dna_seq:
        Response(status=status.HTTP_400_BAD_REQUEST)
    
    dna_seq = valid_sequence(dna_seq)
    if dna_seq == False:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        blast_res = prepare.delay(seq=dna_seq,db='./blastDB/Nucleotide.fasta')           
        blast_res.wait(timeout=200, interval=0.5)
        return Response(status=status.HTTP_201_CREATED)
    
