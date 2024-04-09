# Google Places Grabber by Zohaib Ramzan

This repository contains a data scraping script designed to extract comprehensive information on hospitals and jails across the United States from Google Maps.

## Installation
To install the required packages, run the following command:

Make sure to connect `database.js` with the correct MongoDB URI.

## Usage
1. Run the script to fill the country with cities:
node scripts/Step1-fillTheCountryWithCities.js

2. Run the script to fill cities with fences:
node scripts/fillCitiesWithFences.js

## Overview
The "Google Map Places Grabber" is an ambitious data scraping script developed to gather vital data from Google Maps regarding hospitals and jails across the United States.

### Key Components
- **Puppeteer Automation:** Utilizes Puppeteer to automate interactions with Google Maps, extracting essential data such as names, addresses, and geographic coordinates.
- **State and City Iteration:** Systematically traverses through states and cities, optimizing data collection for efficiency and accuracy.
- **Data Extraction:** Captures names, addresses, and other pertinent details of hospitals and jails, maintaining data integrity.
- **Geolocation Retrieval:** Retrieves latitude and longitude coordinates for precise mapping and location-based services.

## Project Impact
The data collected serves as a foundational resource for various applications, including emergency triggering systems like "GoodFam | Emergency Triggering App."

## Key Challenges and Achievements
- **Automation Skill:** Required advanced automation skills to navigate complex web interfaces.
- **Research and Development:** Conducted extensive research to devise efficient scraping strategies.
- **Data Integrity:** Ensured accuracy and integrity throughout the scraping process.

The "Google Map Places Grabber" project showcases a fusion of automation, research, and ingenuity, culminating in a valuable dataset that fuels critical applications in emergency response and public safety.