Name: 曾淯
ID: 512558013

### Fuzz Monitor
```
┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 1 hrs, 37 min, 18 sec      │  cycles done : 6      │
│   last new path : 0 days, 0 hrs, 1 min, 38 sec       │  total paths : 28     │
│ last uniq crash : 0 days, 1 hrs, 37 min, 2 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 1 hrs, 35 min, 14 sec      │   uniq hangs : 4      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 4* (14.29%)       │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.11 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 32/8            │ favored paths : 4 (14.29%)             │
│ stage execs : 496/1369 (36.23%)     │  new edges on : 4 (14.29%)             │
│ total execs : 91.7k                 │ total crashes : 10.8k (1 unique)       │
│  exec speed : 19.04/sec (zzzz...)   │  total tmouts : 6224 (10 unique)       │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/3488, 4/3469, 2/3431                │    levels : 3          │
│  byte flips : 0/436, 0/417, 0/379                   │   pending : 10         │
│ arithmetics : 11/24.4k, 0/18.7k, 0/11.6k            │  pend fav : 0          │
│  known ints : 2/1602, 2/6265, 0/10.0k               │ own finds : 27         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/2973, 1/3728                        │ stability : 100.00%    │
│        trim : 99.96%/125, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu000: 78%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==157099==ERROR: AddressSanitizer: stack-overflow on address 0x7fff62e87338 (pc 0x56043aac3ee1 bp 0x7fff64688090 sp 0x7fff62e87340 T0)
    #0 0x56043aac3ee1 in main /home/kali/AFL/lab6/src/hw0302.c:46
    #1 0x7f8db65666c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f8db6566784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x56043aac48d0 in _start (/home/kali/AFL/lab6/src/bmpcomp+0x28d0) (BuildId: 8fee90f88958c0594408a30de9c0d884264cdd47)

SUMMARY: AddressSanitizer: stack-overflow /home/kali/AFL/lab6/src/hw0302.c:46 in main
==157099==ABORTING

```
