const PlayerHistory = {
    playerHistoryKey: "playerHistory",
    setPlayerHistory(percentage, totalHits, totalQuestions) {
        const datePerformed = new Date();

        let playerHistory = this.getPlayerHistory();

        if (Array.isArray(playerHistory)) {
            playerHistory.push({
                datePerformed, percentage, totalHits, totalQuestions
            })
        }
        else {
            playerHistory = [{
                datePerformed, percentage, totalHits, totalQuestions
            }]
        }

        localStorage.setItem(this.playerHistoryKey, JSON.stringify(playerHistory));
    },
    getPlayerHistory() {
        const playerHistory = JSON.parse(localStorage.getItem(this.playerHistoryKey));

        return playerHistory;
    }

};

export default PlayerHistory;