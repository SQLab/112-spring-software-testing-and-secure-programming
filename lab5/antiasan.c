// TODO:
void antiasan(unsigned long addr) {
    char *tmp = malloc(sizeof(char));
    if (tmp) {
        *tmp = 0;
        free(tmp);
    }
}
