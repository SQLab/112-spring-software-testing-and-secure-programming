Name: 
ID: 

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 4 hrs, 43 min, 50 sec      │  cycles done : 3      │
│   last new path : 0 days, 0 hrs, 3 min, 37 sec       │  total paths : 43     │
│ last uniq crash : 0 days, 3 hrs, 9 min, 55 sec       │ uniq crashes : 3      │
│  last uniq hang : 0 days, 4 hrs, 42 min, 42 sec      │   uniq hangs : 3      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 30* (69.77%)      │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 3.03 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 4 (9.30%)              │
│ stage execs : 455/1840 (24.73%)     │  new edges on : 4 (9.30%)              │
│ total execs : 135k                  │ total crashes : 16.3k (3 unique)       │
│  exec speed : 8.09/sec (zzzz...)    │  total tmouts : 26.6k (6 unique)       │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 9/5376, 3/5352, 4/5304                │    levels : 6          │
│  byte flips : 0/672, 0/648, 0/600                   │   pending : 19         │
│ arithmetics : 20/36.0k, 0/28.8k, 0/18.1k            │  pend fav : 0          │
│  known ints : 2/2248, 3/9114, 1/15.6k               │ own finds : 42         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 2/4180, 1/1152                        │ stability : 100.00%    │
│        trim : 99.93%/179, 0.00%                     ├────────────────────────┘
────────────────────────────────────────────────────┘          [cpu000: 63%]
```

### Run Crash Result
```
size of Header 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==143173==ERROR: AddressSanitizer: stack-overflow on address 0x7ffec5fd1218 (pc 0x5f8bdc30b123 bp 0x7ffec67d0670 sp 0x7ffec5fd0220 T0)
    #0 0x5f8bdc30b123 in main /home/guan/Desktop/github/Lab/lab6/src/hw0302.c:47
    #1 0x7b4468229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7b4468229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5f8bdc30bc04 in _start (/home/guan/Desktop/github/Lab/lab6/src/bmpcomp+0x2c04)

SUMMARY: AddressSanitizer: stack-overflow /home/guan/Desktop/github/Lab/lab6/src/hw0302.c:47 in main
==143173==ABORTING
```
