from django.db import models
from decimal import Decimal
from django.utils import timezone

# Create your models here.

class Query(models.Model):
    query = models.CharField(max_length=200)
    date_submitted = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.query

class Result(models.Model):
    qseqid = models.ForeignKey(
        Query, related_name='results', on_delete=models.CASCADE)
    salltitles = models.CharField(default='RESULT UNKNOWN', max_length=200)
    user_input = models.TextField(default='DEFAULT USER INPUT')
    sseqid = models.CharField(max_length=200, blank=True)
    qstart = models.IntegerField(null=True)
    date_submitted = models.DateTimeField(default=timezone.now)
    qend = models.IntegerField(null=True)
    sstart = models.IntegerField(null=True)
    send = models.IntegerField(null=True)
    pident = models.DecimalField(default=Decimal(
        '0.00'), max_digits=5, decimal_places=2)
    length = models.IntegerField(null=True)
    mismatch = models.IntegerField(null=True)
    gapopen = models.DecimalField(default=Decimal(
        '0.00'), max_digits=5, decimal_places=2)
    evalue = models.DecimalField(default=Decimal(
        '0.00'), max_digits=10, decimal_places=10)
    bitscore = models.DecimalField(default=Decimal(
        '0.00'), max_digits=20, decimal_places=2)

    def __str__(self):
        return "subject_id: {}, name of the protein: {}, start of alignment in subject: {}, end of alignment in subject: {}, percentage of identical matches: {}".format(self.sseqid, self.salltitles, self.sstart, self.send, self.pident)
