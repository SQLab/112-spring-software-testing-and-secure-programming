
Name: 楊杰峰
ID: 510558017

### Fuzz Monitor
```
    american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 2 min, 48 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 1 min, 44 sec       │  total paths : 9      │
│ last uniq crash : 0 days, 0 hrs, 2 min, 21 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 1 min, 4 sec        │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 1 (11.11%)        │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.69 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 2 (22.22%)             │
│ stage execs : 810/1750 (46.29%)     │  new edges on : 2 (22.22%)             │
│ total execs : 1615                  │ total crashes : 50 (1 unique)          │
│  exec speed : 30.33/sec (slow!)     │  total tmouts : 286 (4 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 1/224, 1/223, 0/221                   │    levels : 4          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 9          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 2          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 1          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 12.50%/7, 0.00%                       ├────────────────────────┘
│─────────────────────────────────────────────────────┘          [cpu000: 31%]

Name: 
ID: 

### Fuzz Monitor
```


```

### Run Crash Result
```

jf@jf-VirtualBox:~/510558017/510558017/lab6/fuzz$ ../src/bmpcomp out/crashes/id\:000000\,sig\:06\,src\:000001\,op\:flip1\,pos\:20 
size of Header 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==7016==ERROR: AddressSanitizer: stack-overflow on address 0x7fff3943dbc8 (pc 0x560eae84105d bp 0x7fff39c3c020 sp 0x7fff3943cbd0 T0)
    #0 0x560eae84105c in main /home/jf/510558017/510558017/lab6/src/hw0302.c:46
    #1 0x7fa09622b082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x560eae841b8d in _start (/home/jf/510558017/510558017/lab6/src/bmpcomp+0x2b8d)

SUMMARY: AddressSanitizer: stack-overflow /home/jf/510558017/510558017/lab6/src/hw0302.c:46 in main
==7016==ABORTING


```
