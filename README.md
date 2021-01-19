# Search_DNA_Seq_App

### This app helps user to get protien info for the submitted DNA sequence.  

### Steps to run this app locally 
```
1 clone this github repository
2 cd to ginkgo/
3 activate virtual environment using command source bin/activate 
4 Run the 'run_script.js' using command source run_script.js
5	this will install all the dependency and open the browser automatcally
6	If you don't see the app running locally, refresh the webpage.
7	copy paste a DNA sequence and click Submit 
8 The results will be displayed in Recent Search list.
```    

### Click below link to see the running app
```
http://shruti2190.pythonanywhere.com/
```

 Example sequence:
```
AAAATATTGTCACTGTTTAAGAATTGTGAAAAAAATAGTGTAAGCAATAGCAGATCATTAAATAATCCCCCAAATTTTCAGAATTGTCAAAAATATTTTAGCACAATTCTAATATTTCTGGCAAAAAATATTCATAGTTGTCACATTAATAATGCAACAAATATGAAAAAATAATGATTTAGAATTTAGTAACATGTAAATATTTTTATATACATATACAAATTTGTTACTCTGTTTATTTTAGTTGTGTATTGATTATGTAAAAACATATAAAGAAAAAGACAGAATCTAACATAGGATATGCCAAAAAT
```

### Blast database details:

```
Sequences of the NCIB entries: ​​NC_000852, NC_007346, NC_008724, NC_009899, NC_014637, NC_020104, NC_023423, NC_023640, NC_023719,NC_027867 have been downloaded from NCBI proteins written in fasta format and created Blast databases cocontaining the provided list of proteins using makeblastdb -dbtype Nucl -in Nucleotide.fasta
```
### Dependencies
```
biopython==1.78
Django==3.1.5
django-blastplus==3.0.0
djangorestframework==3.12.2
python==3.7
node==v12.16.3
npm=6.14.4
React
```

<img width="1274" alt="Screen Shot 2021-01-18 at 6 19 23 PM" src="https://user-images.githubusercontent.com/43798183/104970560-e625f080-59b9-11eb-84ee-c1dceb8e029f.png">

Note: You need to give your local path location to blastn in NcbiblastnCommandline ()
