# Iteration Log — Module 1

After building the /core comparison feature, initial testing revealed
the comparison items appeared in Spanish, even though the assignment
required English. This happened because the backup data built into the
code hadn't been updated when the Supabase database was switched to
English. Identified the issue, updated the fallback file, redeployed,
and retested — confirming all items now display correctly in English
across both the database and its backup.
