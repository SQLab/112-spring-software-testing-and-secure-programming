
Name: 陳志名
ID: 511558014

### Fuzz Monitor
```
                       american fuzzy lop 2.59b (bmpcomp)
┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 20 min, 15 sec      │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 10 min, 22 sec      │  total paths : 12     │
│ last uniq crash : 0 days, 0 hrs, 19 min, 2 sec       │ uniq crashes : 2      │
│  last uniq hang : 0 days, 0 hrs, 5 min, 47 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 1 (8.33%)         │    map density : 0.07% / 0.08%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.92 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/16           │ favored paths : 2 (16.67%)             │
│ stage execs : 510/2010 (25.37%)     │  new edges on : 5 (41.67%)             │
│ total execs : 2055                  │ total crashes : 60 (2 unique)          │
│  exec speed : 1.80/sec (slow...)    │  total tmouts : 150 (6 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 8/224, 4/223, 2/221                   │    levels : 3          │
│  byte flips : 1/28, 1/27, 0/25                      │   pending : 12         │
│ arithmetics : 1/4, 0/3, 0/1                         │  pend fav : 2          │
│  known ints : 1/3, 0/2, 0/0                         │ own finds : 11         │
│  dictionary : 1/7, 0/5, 0/0                         │  imported : n/a        │
│       havoc : 1/3, 0/2                              │ stability : 98.50%     │
│        trim : 95.00%/50, 10.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘             [cpu:633%] │


### Run Crash Result
```
size of Header 54
AddressSanitizer:DEADLYSIGNAL
==42107==ERROR: AddressSanitizer: stack-overflow on address 0x7fffe1cfc728 (pc 0x5612d7747028 bp 0x7fffe2a2ac10 sp 0x7fffe1cfc728 T0)
    #0 0x5612d7747027 in main /home/username/Desktop/AFL/lab/src/hw0302.c:50
    #1 0x7facc1693082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5612d7747b0d in _start (/home/lab6/Desktop/AFL/lab/src/bmpcomp+0x2b0d)
SUMMARY: AddressSanitizer: stack-overflow /home/lab6/Desktop/AFL/lab/src/hw0302.c:50 in main
==42107==ABORTING
```
