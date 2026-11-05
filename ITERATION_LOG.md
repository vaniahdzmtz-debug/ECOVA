# Iteration Log

## Module 1

After building the /core comparison feature, initial testing revealed the comparison items appeared in Spanish, even though the assignment required English. This happened because the backup data built into the code hadn't been updated when the Supabase database was switched to English. I identified the issue, updated the fallback file, redeployed, and retested, confirming all items now display correctly in English across both the database and its backup.

## Week 2

While setting up the research_items table in Supabase, I initially pasted the wrong SQL file (the core_items seed script instead of the new research_items one), which produced an error. I corrected this immediately by pasting the right file.

After testing the live /research page, I noticed a real usability issue. On phones, tapping the search box caused the browser to automatically zoom in, since the text was smaller than the 16px minimum that prevents this on iOS. The competitors table also felt cramped on narrow screens. I fixed both by increasing the input font size to 16px and hiding the less critical "Category" column on small screens, keeping Name, Type, and Notes visible. I tested this again on a phone-width screen afterward to confirm the fix worked.

## Week 3

### Bug 1: Saving a scenario failed with "Invalid API key"
- **What I found:** On the live /pricing page, Save showed "Something went wrong while saving. Nothing was saved."
- **Cause:** The Supabase table and permissions were fine. The Supabase key stored in Vercel was not valid. I made the page show the real error text, and it said "Invalid API key."
- **Fix:** I replaced the key in Vercel, set both Supabase variables as Config type, and redeployed.
- **Retest:** Save showed "Saved!", and the scenario was still in the list after a refresh.

### Process note
- Some Week 3 commits used the generic title "Add files via upload." From Week 4, I commit from GitHub Desktop with clear messages.

## Week 4

### Bug 1: Repeated votes were all counted
- **What I found:** While testing the A/B tester on the live /marketing page, I clicked Option A three times and the page counted 3 votes. One person could change the results by clicking many times.
- **Cause:** The page did not remember that a person had already voted. It only blocked clicks for about one second.
- **Fix:** The page now remembers the vote in the browser (one vote per test). After voting, both options are disabled and the page shows "You already voted in this test."
- **Retest:** After the fix, I voted once, tried to vote again, and refreshed the page. The buttons stayed disabled and only one vote was saved. I deleted my test votes from Supabase before asking friends to vote.
- **Known limit:** The limit is per browser, not per person. Someone could vote again from another browser or a private window.

### Change after A/B testing
- **Test 1 (homepage headline), 12 votes:** A "Make greener choices without spending more." got 11, B "Compare two everyday choices in ten seconds." got 1. I kept headline A, which was already on the homepage.
- **Test 2 (social post hook), 12 votes:** A "A Metro ride: $5-13. A rideshare: $80-150+." got 2, B "Quick question: which is cheaper and greener, Metro or rideshare?" got 10. I changed Post 3 to use hook B.
- **Limit:** The votes came from friends and classmates, so this is a small first signal and not proof.

### Process note
- This week I committed from my own computer with GitHub Desktop, using a clear message for each step, instead of "Add files via upload."