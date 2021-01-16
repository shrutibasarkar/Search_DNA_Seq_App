from Bio import SeqIO
from Bio.Blast import NCBIXML
from decimal import Decimal
from Bio.Seq import Seq
from Bio.SeqRecord import SeqRecord
from tempfile import TemporaryDirectory
import csv
from pathlib import Path
from .models import Query,Result
from django.utils import timezone
from Bio.Blast.Applications import NcbiblastxCommandline
import os 
import subprocess 

userInputFileSubPath = '/blastDB/userInput.fasta'
resultFileSubPath = '/blastDB/result.txt'

# This should be changed to work in production
blastxPath = '/usr/local/ncbi/blast/bin/blastx'

valid_dna_nucleotides = ["A","C","G","T"]
def valid_sequence(string):
    tmpSeq= string.upper().replace("\n", "").replace("\r", "").replace(" ", "")
    for nuc in set(tmpSeq):
        if nuc not in valid_dna_nucleotides:
            return False
    return tmpSeq

def parse_xml_file(blast_file_path):
    result_hsps=[]
    E_VALUE_THRESH = 0.04
    for record in NCBIXML.parse(open(blast_file_path)):
        if record.alignments:  # skip queries with no matches
            for align in record.alignments:
                for hsp in align.hsps:
                    if hsp.expect < E_VALUE_THRESH:
                        result_hsps.append(hsp)
    return result_hsps


def parse_txt_file(file_path):
    header = ["qaccver", "saccver", "pident",
              "length", "mismatch", "gapopen",
              "qstart", "qend", "sstart", "send",
              "evalue", "bitscore"]
    with open(file_path, "rt") as blastfile:
        blast_csv = csv.reader(blastfile, delimiter="\t")
        return [dict(zip(header, line)) for line in blast_csv]

    
def getBlast(seq, db, evalue=0.001):

        dir_path = os.path.dirname(os.path.realpath(__file__))
        userInputFile = dir_path + userInputFileSubPath 
        resultFilePath =  dir_path + resultFileSubPath
        dbPath = dir_path + db 
        
        """Writes fasta sequence to specified path."""
        sequence = Seq(seq)
        rec = SeqRecord(sequence, id="seq_id", description="DNA_seq_search")
        SeqIO.write(rec, str(userInputFile), "fasta")
        
        
        """Storing DNA submitted by user to database"""
        query = Query(query=seq, date_submitted=timezone.now())
        query.save()

        blastx_cline = NcbiblastxCommandline(cmd=blastxPath, query=str(userInputFile), db=dbPath, evalue=0.001, outfmt=6, out=str(resultFilePath))
        
        blastx_cline()
        
        result = parse_txt_file(str(resultFilePath))
        
        print("result", result)

        for record in result:
            res = Result( qseqid=query,
                        sseqid=record.get("saccver"),
                        pident=Decimal(record.get("pident")),
                        length=record.get("length"),
                        mismatch=record.get("mismatch"),
                        gapopen=record.get("gapopen"),
                        qstart=record.get("qstart"),
                        qend=record.get("qend"),
                        sstart=record.get("sstart"),
                        send=record.get("send"),
                        evalue=Decimal(record.get("evalue")),
                        bitscore=Decimal(record.get("bitscore"))
                        )
            res.date_submitted = timezone.now()
            print("----->", res)
            res.save()
