library(tidyverse)
loadfonts()

setwd('~/Desktop/repos/dataviz/project/data/')

#################
### LOAD DATA ###
#################

cases <- read_csv("htd/cases.csv")

################
### AGG DATA ###
################

#type of trafficking
cases <- mutate(cases, labor_bin = ifelse(labor =='false' | is.na(labor), 0, 1))
cases <- mutate(cases, adult_sex_bin = ifelse(adult_sex =='false' | is.na(adult_sex), 0, 1))
cases <- mutate(cases, minor_sex_bin = ifelse(minor_sex =='false' | is.na(minor_sex), 0, 1))

#count by type of trafficking
labor_count <- sum(cases$labor_bin)
asex_count <- sum(cases$adult_sex_bin)
msex_count <- sum(cases$minor_sex_bin)

#create df of counts
types <- c('labor', 'adult_sex', 'minor_sex')
counts <- c(labor_count, asex_count, msex_count)
df <- data.frame(types, counts)
write_csv(df, 'counts_by_type.csv')

