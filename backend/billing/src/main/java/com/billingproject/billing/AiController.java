package com.billingproject.billing;


import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/ai")
@CrossOrigin
public class AiController {
    private final String API_KEY = System.getenv("OPENAI_API_KEY");
    @PostMapping("/summary")
    public String generateSummary(@RequestBody Map<String, Object> bill) {

        try {

            Object itemsObj = bill.get("items");

            if (!(itemsObj instanceof java.util.List)) {
                return "Invalid bill data";
            }

            java.util.List<?> items = (java.util.List<?>) itemsObj;

            double total = 0;
            double maxPrice = Double.MIN_VALUE;
            double minPrice = Double.MAX_VALUE;

            String maxItem = "";
            String minItem = "";

            for (Object obj : items) {

                if (!(obj instanceof Map)) continue;

                Map<?, ?> item = (Map<?, ?>) obj;

                String name = String.valueOf(item.get("name"));
                double price = Double.parseDouble(item.get("price").toString());
                int qty = Integer.parseInt(item.get("quantity").toString());

                double itemTotal = price * qty;
                total += itemTotal;

                if (itemTotal > maxPrice) {
                    maxPrice = itemTotal;
                    maxItem = name;
                }

                if (itemTotal < minPrice) {
                    minPrice = itemTotal;
                    minItem = name;
                }
            }

            double avg = total / items.size();

            // 💡 Insight logic
            String suggestion = "";
            if (total > 3000) {
                suggestion = "This is a high-value bill. Consider reviewing expensive items.";
            } else {
                suggestion = "Spending is within a normal range.";
            }

            return " This invoice contains " + items.size() + " items.\n\n" +
                    " Total Amount: ₹" + String.format("%.2f", total) + "\n" +
                    " Highest Cost Item: " + maxItem + " (₹" + String.format("%.2f", maxPrice) + ")\n" +
                    " Lowest Cost Item: " + minItem + " (₹" + String.format("%.2f", minPrice) + ")\n" +
                    " Average Item Cost: ₹" + String.format("%.2f", avg) + "\n\n" +
                    " Insight: " + suggestion;

        } catch (Exception e) {
            return "AI processing error: " + e.getMessage();
        }
    }
}
