Name:簡君育 
ID:511558023

### Fuzz Monitor
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 4 hrs, 10 min, 39 sec      │  cycles done : 3      │
│   last new path : 0 days, 0 hrs, 6 min, 8 sec        │  total paths : 21     │
│ last uniq crash : 0 days, 4 hrs, 10 min, 27 sec      │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 5* (23.81%)       │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.27 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 2 (9.52%)              │
│ stage execs : 895/1450 (61.72%)     │  new edges on : 2 (9.52%)              │
│ total execs : 38.4k                 │ total crashes : 4423 (1 unique)        │
│  exec speed : 24.87/sec (slow!)     │  total tmouts : 5272 (3 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/1568, 2/1559, 1/1541                │    levels : 4          │
│  byte flips : 0/196, 0/187, 0/169                   │   pending : 13         │
│ arithmetics : 11/9608, 0/7266, 0/4779               │  pend fav : 0          │
│  known ints : 1/672, 2/2634, 0/4146                 │ own finds : 20         │
│  dictionary : 0/0, 0/0, 0/66                        │  imported : n/a        │
│       havoc : 0/2860, 0/0                           │ stability : 100.00%    │
│        trim : 99.98%/75, 0.00%                      ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 12%]

### Run Crash Result
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==53668==ERROR: AddressSanitizer: stack-overflow on address 0x7ffc4144e468 (pc 0x55cdd0b130ee bp 0x7ffc41c4d8e0 sp 0x7ffc4144d470 T0)
    #0 0x55cdd0b130ee in main /home/nems/Downloads/ghact-practice/511558023/lab6/src/hw0302.c:46
    #1 0x7f324fe2814f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f324fe28208 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55cdd0b13aa4 in _start (/home/nems/Downloads/ghact-practice/511558023/lab6/src/bmpcomp+0x2aa4) (BuildId: 7521370cee815b7106833a3c4ac075c50d31749d)

SUMMARY: AddressSanitizer: stack-overflow /home/nems/Downloads/ghact-practice/511558023/lab6/src/hw0302.c:46 in main
==53668==ABORTING
