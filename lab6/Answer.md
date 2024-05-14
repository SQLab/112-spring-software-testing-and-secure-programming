Name: 楊政浩
ID: 510558018

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 21 min, 11 sec      │  cycles done : 2      │
│   last new path : 0 days, 0 hrs, 4 min, 36 sec       │  total paths : 33     │
│ last uniq crash : 0 days, 0 hrs, 21 min, 5 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 26* (78.79%)      │    map density : 0.03% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.90 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 16/8          │ favored paths : 4 (12.12%)             │
│ stage execs : 0/23 (0.00%)          │  new edges on : 4 (12.12%)             │
│ total execs : 52.1k                 │ total crashes : 5924 (1 unique)        │
│  exec speed : 32.13/sec (slow!)     │  total tmouts : 3436 (7 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 8/2144, 5/2132, 2/2108                │    levels : 4          │
│  byte flips : 0/268, 0/233, 0/211                   │   pending : 22         │
│ arithmetics : 13/13.6k, 0/10.5k, 0/6880             │  pend fav : 0          │
│  known ints : 2/950, 3/3716, 0/5903                 │ own finds : 32         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/3063, 0/0                           │ stability : 100.00%    │
│        trim : 99.97%/90, 0.00%                      ├────────────────────────┘
┴────────────────────────────────────────────────────┘          [cpu000:135%]]

```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==4184889==ERROR: AddressSanitizer: stack-overflow on address 0x7ffbfee73028 (pc 0x560d8cdbee6b bp 0x7ffc00673d80 sp 0x7ffbfee73030 T0)
    #0 0x560d8cdbee6b in main /home/black/Desktop/lab6/src/hw0302.c:46                                                                               
    #1 0x7f6727c456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f6727c45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x560d8cdbf8c0 in _start (/home/black/Desktop/lab6/src/bmpcomp+0x28c0) (BuildId: a5f29f67b8c2d745a32cfeafacc257f447c0a825)

SUMMARY: AddressSanitizer: stack-overflow /home/black/Desktop/lab6/src/hw0302.c:46 in main
==4184889==ABORTING

```
