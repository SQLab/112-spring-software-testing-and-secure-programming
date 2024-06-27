Name: 柯俊亦
ID: 51

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 11 min, 6 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 49 sec       │  total paths : 21     │
│ last uniq crash : 0 days, 0 hrs, 0 min, 57 sec       │ uniq crashes : 3      │
│  last uniq hang : 0 days, 0 hrs, 9 min, 45 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 1 (4.76%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.26 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 2/1           │ favored paths : 4 (19.05%)             │
│ stage execs : 159/223 (71.30%)      │  new edges on : 5 (23.81%)             │
│ total execs : 6667                  │ total crashes : 879 (3 unique)         │
│  exec speed : 9.79/sec (zzzz...)    │  total tmouts : 1057 (7 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/448, 2/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 20         │
│ arithmetics : 7/1565, 0/1300, 0/816                 │  pend fav : 4          │
│  known ints : 1/104, 2/415, 1/709                   │ own finds : 20         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 4/408, 0/0                            │ stability : 100.00%    │
│        trim : 99.99%/43, 0.00%                      ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu001: 83%]
```

### Run Crash Result
```
ubuntu@ubun2004:~/Desktop/fuzz/lab6/fuzz$ cat ./out/crashes/id\:000000\,sig\:06\,src\:000000\,op\:flip1\,pos\:20  | ../src/bmpcomp .
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==32899==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe5723d1e8 (pc 0x55b67016504f bp 0x7ffe57a3b640 sp 0x7ffe5723c1f0 T0)
    #0 0x55b67016504e in main /home/ubuntu/Desktop/fuzz/lab6/src/hw0302.c:46
    #1 0x7fbf47433082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55b670165b3d in _start (/home/ubuntu/Desktop/fuzz/lab6/src/bmpcomp+0x2b3d)

SUMMARY: AddressSanitizer: stack-overflow /home/ubuntu/Desktop/fuzz/lab6/src/hw0302.c:46 in main
==32899==ABORTING
```
