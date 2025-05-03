const { Actor } = require('apify');
const { execSync } = require('child_process');

Actor.main(async () => {
    console.log('Starting Instagram scraper...');
    
    // Get input from Apify
    const input = await Actor.getInput();
    const username = input.username || '';
    const hashtag = input.hashtag || '';
    const count = input.count || 100;
    
    let command = '';
    
    // Build the command based on inputs
    if (username) {
        command = `node bin/cli.js user ${username} --count ${count}`;
    } else if (hashtag) {
        command = `node bin/cli.js hashtag ${hashtag} --count ${count}`;
    } else {
        throw new Error('Please provide either a username or hashtag to scrape');
    }
    
    console.log(`Executing command: ${command}`);
    
    try {
        // Run the CLI command
        const result = execSync(command, { encoding: 'utf8' });
        console.log(result);
        
        // Save the output to dataset
        await Actor.pushData({
            status: 'success',
            message: 'Scraping completed',
            result: 'Check the Key-value store for saved files'
        });
    } catch (error) {
        consol
