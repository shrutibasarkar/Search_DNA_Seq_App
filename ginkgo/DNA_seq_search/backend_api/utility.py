from Bio import SeqIO
from Bio.Blast import NCBIXML
from Bio.Seq import Seq
from Bio.SeqRecord import SeqRecord
import tempfile
import csv
from pathlib import Path

valid_dna_nucleotides = ["A","C","G","T"]
def valid_sequence(string):
    tmpSeq= string.upper().replace("\n", "").replace("\r", "").replace(" ", "")
    for nuc in set(tmpSeq):
        if nuc not in valid_dna_nucleotides:
            return False
    return tmpSeq


def write_seq(seq_string, seq_id, format, desc, outfile):
    seq = Seq(seq_string)
    rec = SeqRecord(seq, id=seq_id, description=description)
    SeqIO.write(rec, outfile, format)
    

def parse_xml_file(blast_file_path):
    result_hsps=[]
    for record in NCBIXML.parse(open("my_blast.xml")):
        if record.alignments:  # skip queries with no matches
            print("QUERY: %s" % record.query[:60])
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


def prepare(seq, db, query="unknown", evalue=0.001):
    with tempfile.TemporaryFile() as tmpdir:
        fp = Path(tmpdir)
        seq_file = fp.joinpath("userInput.fasta")
        result_file = fp.joinpath('results.txt')

        """ write_seq is called to write the sequence """

        write_seq(seq, "seq_id", "fasta", "DNA_seq_search", str(seq_file))

        query = Query(query=query, pub_date=timezone.now())
        query.save()

        blast_cline = NcbiblastxCommandline(query=str(seq_file), db=db, evalue=evalue, outfmt=6, out=str(result_file))
        blast_cline()  # Running BLAST

        result = parse_txt_file(str(result_file))

        for record in result:
            b = Result( qseqid=query,
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
            b.pub_date = timezone.now()
            b.save()
