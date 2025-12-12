# Exercise 1: Hosting Comparison Table

## 🎯 Objective

Create a professional comparison table for three web hosting providers. This exercise will help you practice:
- Using semantic table elements
- Adding proper headers with `scope` attributes
- Creating a descriptive caption
- Organizing data in a clear, accessible way

## 📋 Requirements

Create an HTML table that compares three hosting providers across the following features:

**Providers:**
- BasicHost
- ProCloud
- EnterpriseMax

**Features to compare:**
1. **Storage:** 10 GB, 100 GB, Unlimited
2. **Bandwidth:** 100 GB/month, 1 TB/month, Unlimited
3. **Email Accounts:** 5, 50, Unlimited
4. **Databases:** 2, 10, Unlimited
5. **SSL Certificate:** No, Yes, Yes
6. **Support:** Email only, Email + Chat, 24/7 Phone
7. **Price:** $5/month, $15/month, $50/month

**Table requirements:**
- ✅ Use `<caption>` to describe the table
- ✅ Use `<thead>`, `<tbody>`, and `<tfoot>` for proper structure
- ✅ Use `scope="col"` for column headers
- ✅ Use `scope="row"` for feature names
- ✅ Add a footer row showing which plan is recommended for beginners

## 💡 Tips

1. Plan your table structure before coding
2. Use `<th>` for both column headers (provider names) and row headers (feature names)
3. The `scope` attribute helps screen readers understand the table
4. Keep data consistent and aligned

## ✅ Testing Checklist

Before you consider this exercise complete:

- [ ] Table has a descriptive caption
- [ ] Table uses semantic elements (`<thead>`, `<tbody>`, `<tfoot>`)
- [ ] All headers use `scope` attributes
- [ ] Data is organized and easy to read
- [ ] Feature names are marked as row headers with `<th scope="row">`
- [ ] Provider names are marked as column headers with `<th scope="col">`
- [ ] Table is valid HTML (no missing closing tags!)

## 🚀 Bonus Challenges

If you finish early:

1. **Add a row span:** Make the "Price" row header span 2 rows (regular price and discounted price)
2. **Add highlighting:** Use a `<tfoot>` to highlight the most popular plan
3. **Add more features:** SSL, backup frequency, uptime guarantee
4. **Make it responsive:** Add a note in comments about how you'd make this mobile-friendly with CSS

## 📁 Files

- **Starter:** `starter/hosting-comparison.html` (basic HTML skeleton)
- **Solution:** `solution/hosting-comparison.html` (check only after trying!)

**Ready? Open the starter file and begin!** 🎯

