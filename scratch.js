// player.js
define(["dao", "globals", "core/finances", "data/injuries", "data/names", "lib/bluebird", "lib/faces", "lib/underscore", "util/eventLog", "util/helpers", "util/random"], function (dao, g, finances, injuries, names, Promise, faces, _, eventLog, helpers, random) {
    "use strict";

    function ovr(ratings) {
        var runningBackRating, safetyRating, tightEndRating, ovrRating;
        var mainRating;
        var qb, rb, te, wr, position, ol, dl, lb, cb, s, k, offense, defense;

        qb = false;
        rb = false;
        te = false;
        wr = false;
        ol = false;
        dl = false;
        lb = false;
        cb = false;
        s = false;
        k = false;
        offense = false;
        defense = false;

        
        // if (ratings.drb > ratings.reb) {
        //     position = 'OL';
        //     ovrRating = (ratings.drb * 4 + ratings.ft * 4 + ratings.dnk * 2 + ratings.hgt * 2 + ratings.stre * 4 + ratings.jmp * 2 + ratings.hnd * 4) / 22;
        // } else {
        //     position = 'DL';
        //     ovrRating = (ratings.pss * 4 + ratings.reb * 3 + ratings.stre * 2 + ratings.hgt * 2 + ratings.jmp * 2 + ratings.hnd * 2 + ratings.fg * 4 + ratings.tp * 2) / 21;
        // }
                
        runningBackRating = (ratings.dnk + ratings.ft + ratings.hgt + ratings.stre + ratings.spd + ratings.jmp) / 6 * 1.1 / 2;
        safetyRating = ((ratings.reb + ratings.cvr) / 2) * 1.1;
        tightEndRating = ((ratings.stl + ratings.drb) / 2) * 1.1;
        
        // QB
        if (((ratings.blk >= tightEndRating) && (ratings.blk >= safetyRating) && (ratings.blk >= runningBackRating) && (ratings.blk >= ratings.stl) && (ratings.blk >= ratings.drb) && (ratings.blk >= ratings.pss) && (ratings.blk >= ratings.reb) && (ratings.blk >= ratings.cvr) && (ratings.blk >= ratings.kck))) {
            qb = true;
            ovrRating = (ratings.ins * 4 + ratings.blk * 4 + ratings.stre * 2 + ratings.hgt + ratings.jmp + ratings.ft * 2 + ratings.dnk) / 15;

        }
        // RB
        mainRating = runningBackRating;
        if (((mainRating > ratings.kck) && (mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr))) {
            ovrRating = (ratings.dnk * 4 + ratings.ft * 4 + ratings.hgt * 4 + ratings.stre * 4 + ratings.spd * 2 + ratings.jmp * 2 + ratings.hnd * 2) / 22;
            rb = true;
        }
        // WR
        mainRating = ratings.stl;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr) && (mainRating > ratings.kck))) {
            wr = true;
            ovrRating = (ratings.hgt * 4 + ratings.stl * 4 + ratings.drb + ratings.stre + ratings.jmp + ratings.ft + ratings.dnk) / 13;

        }
        // TE
        mainRating = tightEndRating;
        if (((mainRating > ratings.kck) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr))) {
            te = true;
            ovrRating = (ratings.stl * 4 + ratings.drb * 4 + ratings.dnk * 3 + ratings.ft * 3 + ratings.hgt * 2 + ratings.stre * 2) / 18;
        }
        // OL
        mainRating = ratings.drb;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr) && (mainRating > ratings.kck))) {
            ol = true;
            ovrRating = (ratings.drb * 4 + ratings.ft * 4 + ratings.dnk * 2 + ratings.hgt * 2 + ratings.stre * 4 + ratings.jmp * 2 + ratings.hnd * 4) / 22;
        }
        // DL
        mainRating = ratings.pss;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.reb) && (mainRating > ratings.cvr) && (mainRating > ratings.kck))) {
            dl = true;
            ovrRating = (ratings.pss * 4 + ratings.reb * 3 + ratings.stre * 2 + ratings.hgt * 2 + ratings.jmp * 2 + ratings.hnd * 2 + ratings.fg * 4 + ratings.tp * 2) / 21;
        }
        // LB
        mainRating = ratings.reb;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.cvr) && (mainRating > ratings.kck))) {
            lb = true;
            ovrRating = (ratings.reb * 4 + ratings.pss * 4 + ratings.cvr * 2 + ratings.fg * 4 + ratings.tp * 4 + ratings.hgt * 4 + ratings.stre * 4 + ratings.jmp) / 27;
        }
        // CB
        mainRating = ratings.cvr;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.kck))) {
            cb = true;
            ovrRating = (ratings.cvr * 4 + ratings.hgt * 4 + ratings.fg + ratings.tp + ratings.reb * 2 + ratings.hnd) / 13;
        }
        // S
        mainRating = safetyRating;
        if (((mainRating > ratings.kck) && (mainRating > tightEndRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr))) {
            ovrRating = (ratings.reb * 4 + ratings.cvr * 4 + ratings.hgt * 4 + ratings.stre * 2 + ratings.jmp * 2 + ratings.hnd + ratings.fg * 2 + ratings.tp * 2) / 21;
            s = true;
        }
        // K
        mainRating = ratings.kck;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr))) {
            k = true;
            ovrRating = (ratings.kck * 4 + ratings.stre * 4 + ratings.jmp * 1 + ratings.ins * 1 + ratings.ft * 1) / 11;
        }

        // if (qb) {
        //     position = 'QB';
        //     ovrRating = (ratings.ins * 4 + ratings.blk * 4 + ratings.stre * 2 + ratings.hgt + ratings.jmp + ratings.ft * 2 + ratings.dnk) / 15;
        // } else {
        //     if (rb) {
        //         position = 'RB';
        //         ovrRating = (ratings.dnk * 4 + ratings.ft * 4 + ratings.hgt * 4 + ratings.stre * 4 + ratings.spd * 2 + ratings.jmp * 2 + ratings.hnd * 2) / 22;
        //     }
        //     if (te) {
        //         position = 'TE';
        //         ovrRating = (ratings.stl * 4 + ratings.drb * 4 + ratings.dnk * 3 + ratings.ft * 3 + ratings.hgt * 2 + ratings.stre * 2) / 18;
        //     } else if (wr) {
        //         position = 'WR';
        //         ovrRating = (ratings.hgt * 4 + ratings.stl * 4 + ratings.drb + ratings.stre + ratings.jmp + ratings.ft + ratings.dnk) / 13;
        //     }
        //     if (lb) {
        //         position = 'LB';
        //         ovrRating = (ratings.reb * 4 + ratings.pss * 4 + ratings.cvr * 2 + ratings.fg * 4 + ratings.tp * 4 + ratings.hgt * 4 + ratings.stre * 4 + ratings.jmp) / 27;
        //     }
        //     if (s) {
        //         position = 'S';
        //         ovrRating = (ratings.reb * 4 + ratings.cvr * 4 + ratings.hgt * 4 + ratings.stre * 2 + ratings.jmp * 2 + ratings.hnd + ratings.fg * 2 + ratings.tp * 2) / 21;
        //     }
        //     if (cb) {
        //         position = 'CB';
        //         ovrRating = (ratings.cvr * 4 + ratings.hgt * 4 + ratings.fg + ratings.tp + ratings.reb * 2 + ratings.hnd) / 13;
        //     }
        //     if (k) {
        //         position = 'K';
        //         ovrRating = (ratings.kck * 4 + ratings.stre * 4 + ratings.jmp * 1 + ratings.ins * 1 + ratings.ft * 1) / 11;
        //     }
        // }

        return Math.round(ovrRating);
    }

    function ovrOnly(ratings, position) {
        var runningBackRating, safetyRating, tightEndRating, ovrRating;
        var mainRating;
        var qb, rb, te, wr, ol, dl, lb, cb, s, k, offense, defense;

        qb = false;
        rb = false;
        te = false;
        wr = false;
        ol = false;
        dl = false;
        lb = false;
        cb = false;
        s = false;
        k = false;
        offense = false;
        defense = false;

        console.log(position);
        console.log(ratings);
        if (position == 'OL') {
            ovrRating = (ratings.drb * 4 + ratings.ft * 4 + ratings.dnk * 2 + ratings.hgt * 2 + ratings.stre * 4 + ratings.jmp * 2 + ratings.hnd * 4) / 22;
        }
        if (position == 'DL') {
            ovrRating = (ratings.pss * 4 + ratings.reb * 3 + ratings.stre * 2 + ratings.hgt * 2 + ratings.jmp * 2 + ratings.hnd * 2 + ratings.fg * 4 + ratings.tp * 2) / 21;
        }
        if (position == 'QB') {
            ovrRating = (ratings.ins * 4 + ratings.blk * 4 + ratings.stre * 2 + ratings.hgt + ratings.jmp + ratings.ft * 2 + ratings.dnk) / 15;
        }
        if (position == 'RB') {
            ovrRating = (ratings.dnk * 4 + ratings.ft * 4 + ratings.hgt * 4 + ratings.stre * 4 + ratings.spd * 2 + ratings.jmp * 2 + ratings.hnd * 2) / 22;
        }
        if (position == 'TE') {
            ovrRating = (ratings.stl * 4 + ratings.drb * 4 + ratings.dnk * 3 + ratings.ft * 3 + ratings.hgt * 2 + ratings.stre * 2) / 18;
        }
        if (position == 'WR') {
            ovrRating = (ratings.hgt * 4 + ratings.stl * 4 + ratings.drb + ratings.stre + ratings.jmp + ratings.ft + ratings.dnk) / 13;
        }
        if (position == 'LB') {
            ovrRating = (ratings.reb * 4 + ratings.pss * 4 + ratings.cvr * 2 + ratings.fg * 4 + ratings.tp * 4 + ratings.hgt * 4 + ratings.stre * 4 + ratings.jmp) / 27;
        }
        if (position == 'S') {
            ovrRating = (ratings.reb * 4 + ratings.cvr * 4 + ratings.hgt * 4 + ratings.stre * 2 + ratings.jmp * 2 + ratings.hnd + ratings.fg * 2 + ratings.tp * 2) / 21;
        }
        if (position == 'CB') {
            ovrRating = (ratings.cvr * 4 + ratings.hgt * 4 + ratings.fg + ratings.tp + ratings.reb * 2 + ratings.hnd) / 13;
        }
        if (position == 'K') {
            ovrRating = (ratings.kck * 4 + ratings.stre * 4 + ratings.jmp * 1 + ratings.ins * 1 + ratings.ft * 1) / 11;
        }

        return Math.round(ovrRating);
    }

    function skills(ratings) {
        var hasSkill, sk;

        sk = [];

        hasSkill = function (ratings, components, weights, cutoff) {
            var denominator, i, numerator;

            if (weights === undefined) {
                // Default: array of ones with same size as components
                weights = [];
                for (i = 0; i < components.length; i++) {
                    weights.push(1);
                }
            }

            numerator = 0;
            denominator = 0;
            for (i = 0; i < components.length; i++) {
                numerator += (ratings[components[i]] + ratings.fuzz) * weights[i];
                denominator += 100 * weights[i];
            }

            // temporarily turning skills off (may not use?)
            //            if (numerator / denominator > 1.01) {
            //            if (numerator / denominator > cutoff) {
            //if (numerator / denominator > .81) {

            if (numerator / denominator > .71) {
                return true;
            }
            return false;
        };

        // These use the same formulas as the composite rating definitions in core.game!
        if (hasSkill(ratings, g.compositeWeights.throwingAccuracy.ratings, g.compositeWeights.throwingAccuracy.weights, .95)) {
            sk.push("Pp");
        }
        if (hasSkill(ratings, g.compositeWeights.throwingDistance.ratings, g.compositeWeights.throwingDistance.weights, .85)) {
            sk.push("Pd");
        }

        if (hasSkill(ratings, ['blk'], [1], .70)) {
            if (hasSkill(ratings, ['blk'], [1], .70)) {
                if (hasSkill(ratings, g.compositeWeights.avoidSack.ratings, g.compositeWeights.avoidSack.weights, .6)) {
                    sk.push("Pe");
                }
            }
        }


        if (hasSkill(ratings, g.compositeWeights.runningPower.ratings, g.compositeWeights.runningPower.weights, .80)) {
            sk.push("RuP");
        }
        if (hasSkill(ratings, g.compositeWeights.runningSide.ratings, g.compositeWeights.runningSide.weights, .80)) {
            sk.push("RuF");
        }
        if (hasSkill(ratings, g.compositeWeights.receivingShort.ratings, g.compositeWeights.receivingShort.weights, .75)) {
            sk.push("ReS");
        }
        if (hasSkill(ratings, g.compositeWeights.receivingCrossing.ratings, g.compositeWeights.receivingCrossing.weights, .75)) {
            sk.push("ReC");
        }
        if (hasSkill(ratings, g.compositeWeights.receivingLong.ratings, g.compositeWeights.receivingLong.weights, .85)) {
            sk.push("ReD");
        }
        if (hasSkill(ratings, g.compositeWeights.blockPass.ratings, g.compositeWeights.blockPass.weights, .80)) {
            sk.push("Bp");
        }
        if (hasSkill(ratings, g.compositeWeights.blockRun.ratings, g.compositeWeights.blockRun.weights, .70)) {
            sk.push("Br");
        }

        if (hasSkill(ratings, g.compositeWeights.passRush.ratings, g.compositeWeights.passRush.weights, .80)) {
            sk.push("Sa");
        }
        if (hasSkill(ratings, g.compositeWeights.runStop.ratings, g.compositeWeights.runStop.weights, .80)) {
            sk.push("Rs");
        }


        if (hasSkill(ratings, g.compositeWeights.shortCoverage.ratings, g.compositeWeights.shortCoverage.weights, .80)) {
            sk.push("Cs");
        }
        if (hasSkill(ratings, g.compositeWeights.crossingCoverage.ratings, g.compositeWeights.crossingCoverage.weights, .86)) {
            sk.push("Cc");
        }
        if (hasSkill(ratings, g.compositeWeights.deepCoverage.ratings, g.compositeWeights.deepCoverage.weights, .86)) {
            sk.push("Cd");
        }

        if (hasSkill(ratings, g.compositeWeights.punting.ratings, g.compositeWeights.punting.weights, .7)) {
            sk.push("P");
        }
        if (hasSkill(ratings, g.compositeWeights.kickOff.ratings, g.compositeWeights.kickOff.weights, .75)) {
            sk.push("K");
        }
        if (hasSkill(ratings, g.compositeWeights.fieldGoal.ratings, g.compositeWeights.fieldGoal.weights, .80)) {
            sk.push("Fg");
        }


        /*
        if (hasSkill(ratings, ['stre', 'spd', 'jmp', 'hgt'], [1, 1, 1, 0.5])) {
            sk.push("A");
        }
        if (hasSkill(ratings, ['drb', 'spd'])) {
            sk.push("B");
        }
        if (hasSkill(ratings, ['hgt', 'stre', 'spd', 'jmp', 'blk'], [2, 1, 0.5, 0.5, 1])) {
            sk.push("Di");
        }
        if (hasSkill(ratings, ['hgt', 'stre', 'spd', 'jmp', 'stl'], [1, 1, 2, 0.5, 1])) {
            sk.push("Dp");
        }
        if (hasSkill(ratings, ['hgt', 'stre', 'spd', 'ins'], [1, 0.6, 0.2, 1])) {
            sk.push("Po");
        }
        if (hasSkill(ratings, ['drb', 'pss'], [0.4, 1])) {
            sk.push("Ps");
        }
        if (hasSkill(ratings, ['hgt', 'stre', 'jmp', 'reb'], [1, 0.1, 0.1, 0.7])) {
            sk.push("R");
        } */

        return sk;
    }

    function develop(p, years, generate, coachingRank) {
        var age, baseChange, i, j, ratingKeys, r, sigma, sign;

        years = years !== undefined ? years : 1;
        generate = generate !== undefined ? generate : false;
        coachingRank = coachingRank !== undefined ? coachingRank : 15.5; // This applies to free agents!

        r = p.ratings.length - 1;

        age = g.season - p.born.year;

        for (i = 0; i < years; i++) {
            age += 1;

            // Randomly make a big jump
            if (Math.random() > 0.985 && age < 25) {
                p.ratings[r].pot += 10;
            }

            // Variance of ratings change is proportional to the potential difference
            sigma = (p.ratings[r].pot - p.ratings[r].ovr) / 10;

            // 60% of the time, improve. 20%, regress. 20%, stay the same
            baseChange = random.gauss(random.randInt(-1, 3), sigma);

            // Bound possible changes
            if (baseChange > 30) {
                baseChange = 30;
            } else if (baseChange < -5) {
                baseChange = -5;
            }
            if (baseChange + p.ratings[r].pot > 95) {
                baseChange = 95 - p.ratings[r].pot;
            }

            // Modulate by potential difference, but only for growth, not regression
            if (baseChange > 0) {
                baseChange *= 1 + (p.ratings[r].pot - p.ratings[r].ovr) / 7;
            }

            // Modulate by age
            if (age > 26) {
                baseChange /= 3;
            }
            if (age > 21) {
                if (p.pos == 'RB') {
                    baseChange -= 2;
                }
            }

            if (age > 29) {
                baseChange -= 2;
            }
            if (age > 31) {
                baseChange -= 2;
            }
            if (age > 33) {
                baseChange -= 2;
            }
            if (age > 35) {
                baseChange -= 2;
            }


            // Modulate by coaching
            sign = baseChange ? baseChange < 0 ? -1 : 1 : 0;
            if (sign >= 0) { // life is normal
                baseChange *= ((coachingRank - 1) * (-0.5) / (g.numTeams - 1) + 1.25);
            } else {
                baseChange *= ((coachingRank - 1) * (0.5) / (g.numTeams - 1) + 0.75);
            }

            // Easy to improve  // IQ and SKILL
            if ((p.pos == "QB")) {
                ratingKeys = ['ins', 'blk'];
            } else if ((p.pos == "WR")) {
                ratingKeys = ['ins', 'stl'];
            } else if ((p.pos == "RB")) {
                ratingKeys = ['ins'];
            } else if ((p.pos == "TE")) {
                ratingKeys = ['ins'];
            } else if ((p.pos == "OL")) {
                ratingKeys = ['ins', 'drb'];
            } else if ((p.pos == "CB")) {
                ratingKeys = ['ins', 'cvr'];
            } else if ((p.pos == "S")) {
                ratingKeys = ['ins', 'cvr'];
            } else if ((p.pos == "LB")) {
                ratingKeys = ['ins', 'reb'];
            } else if ((p.pos == "DL")) {
                ratingKeys = ['ins', 'pss'];
            } else if ((p.pos == "K")) {
                ratingKeys = ['ins', 'kck'];
            }

            for (j = 0; j < ratingKeys.length; j++) {
                p.ratings[r][ratingKeys[j]] = limitRating(p.ratings[r][ratingKeys[j]] + helpers.bound(random.gauss(1, 2) * baseChange, -100, 35));
            }

            // In between   // STRE, AWARE (offense), END
            if ((p.pos == "QB")) {
                ratingKeys = ['stre', 'spd'];
            } else if ((p.pos == "WR")) {
                ratingKeys = ['stre', 'spd'];
            } else if ((p.pos == "RB")) {
                ratingKeys = ['stre', 'spd', 'drb'];
            } else if ((p.pos == "TE")) {
                ratingKeys = ['stre', 'spd', 'drb', 'stl'];
            } else if ((p.pos == "OL")) {
                ratingKeys = ['stre', 'spd'];
            } else if ((p.pos == "CB")) {
                ratingKeys = ['stre', 'spd', 'reb'];
            } else if ((p.pos == "S")) {
                ratingKeys = ['stre', 'spd', 'reb'];
            } else if ((p.pos == "LB")) {
                ratingKeys = ['stre', 'spd', 'cvr', 'pss'];
            } else if ((p.pos == "DL")) {
                ratingKeys = ['stre', 'spd', 'reb'];
            } else if ((p.pos == "K")) {
                ratingKeys = ['stre', 'spd'];
            }


            for (j = 0; j < ratingKeys.length; j++) {
                p.ratings[r][ratingKeys[j]] = limitRating(p.ratings[r][ratingKeys[j]] + helpers.bound(random.gauss(1, 2) * baseChange, -100, 15));
            }
            //	 Hard to improve // aware/aggre

            if ((p.pos == "QB")) {
                ratingKeys = ['ft'];
            } else if ((p.pos == "WR")) {
                ratingKeys = ['ft'];
            } else if ((p.pos == "RB")) {
                ratingKeys = ['ft', 'stl'];
            } else if ((p.pos == "TE")) {
                ratingKeys = ['ft'];
            } else if ((p.pos == "OL")) {
                ratingKeys = ['ft'];
            } else if ((p.pos == "CB")) {
                ratingKeys = ['fg'];
            } else if ((p.pos == "S")) {
                ratingKeys = ['fg'];
            } else if ((p.pos == "LB")) {
                ratingKeys = ['fg'];
            } else if ((p.pos == "DL")) {
                ratingKeys = ['fg'];
            } else if ((p.pos == "K")) {
                ratingKeys = ['ft'];
            }


            for (j = 0; j < ratingKeys.length; j++) {
                p.ratings[r][ratingKeys[j]] = limitRating(p.ratings[r][ratingKeys[j]] + helpers.bound(random.gauss(1, 2) * baseChange, -10, 10));
            }



            // Hard to improve  // speed, athletic, HEIGHT (aware DEFENSE)
            if (age < 30) {


                if ((p.pos == "QB")) {
                    ratingKeys = ['hgt', 'jmp', 'endu', 'hnd', 'dnk', 'fg', 'tp'];
                } else if ((p.pos == "WR")) {
                    ratingKeys = ['hgt', 'jmp', 'endu', 'hnd', 'dnk', 'fg', 'tp'];
                } else if ((p.pos == "RB")) {
                    ratingKeys = ['hgt', 'jmp', 'endu', 'hnd', 'dnk', 'fg', 'tp'];
                } else if ((p.pos == "TE")) {
                    ratingKeys = ['hgt', 'jmp', 'endu', 'hnd', 'dnk', 'fg', 'tp'];
                } else if ((p.pos == "OL")) {
                    ratingKeys = ['hgt', 'jmp', 'endu', 'hnd', 'dnk', 'fg', 'tp'];
                } else if ((p.pos == "CB")) {
                    ratingKeys = ['hgt', 'jmp', 'endu', 'hnd', 'dnk', 'ft', 'tp'];
                } else if ((p.pos == "S")) {
                    ratingKeys = ['hgt', 'jmp', 'endu', 'hnd', 'dnk', 'ft', 'tp'];
                } else if ((p.pos == "LB")) {
                    ratingKeys = ['hgt', 'jmp', 'endu', 'hnd', 'dnk', 'ft', 'tp'];
                } else if ((p.pos == "DL")) {
                    ratingKeys = ['hgt', 'jmp', 'endu', 'hnd', 'dnk', 'fg', 'tp'];
                }


            } else {


                if ((p.pos == "QB")) {
                    ratingKeys = ['endu', 'hnd', 'dnk', 'fg', 'tp'];
                } else if ((p.pos == "WR")) {
                    ratingKeys = ['endu', 'hnd', 'dnk', 'fg', 'tp'];
                } else if ((p.pos == "RB")) {
                    ratingKeys = ['endu', 'hnd', 'dnk', 'fg', 'tp'];
                } else if ((p.pos == "TE")) {
                    ratingKeys = ['endu', 'hnd', 'dnk', 'fg', 'tp'];
                } else if ((p.pos == "OL")) {
                    ratingKeys = ['endu', 'hnd', 'dnk', 'fg', 'tp'];
                } else if ((p.pos == "CB")) {
                    ratingKeys = ['endu', 'hnd', 'dnk', 'ft', 'tp'];
                } else if ((p.pos == "S")) {
                    ratingKeys = ['endu', 'hnd', 'dnk', 'ft', 'tp'];
                } else if ((p.pos == "LB")) {
                    ratingKeys = ['endu', 'hnd', 'dnk', 'ft', 'tp'];
                } else if ((p.pos == "DL")) {
                    ratingKeys = ['endu', 'hnd', 'dnk', 'ft', 'tp'];
                } else if ((p.pos == "K")) {
                    ratingKeys = ['endu', 'hnd', 'dnk', 'ft', 'tp'];
                }



            }

            for (j = 0; j < ratingKeys.length; j++) {
                p.ratings[r][ratingKeys[j]] = limitRating(p.ratings[r][ratingKeys[j]] + helpers.bound(random.gauss(1, 2) * baseChange, -10, 10));
            }


            // barely moves  // falls NON-SKILL, over 30 SPD, ATH
            if (age < 30) {

                if ((p.pos == "QB")) {
                    ratingKeys = ['stl', 'drb', 'pss', 'reb', 'cvr', 'kck'];
                } else if ((p.pos == "WR")) {
                    ratingKeys = ['blk', 'drb', 'pss', 'reb', 'cvr', 'kck'];
                } else if ((p.pos == "RB")) {
                    ratingKeys = ['blk', 'pss', 'reb', 'cvr', 'kck'];
                } else if ((p.pos == "TE")) {
                    ratingKeys = ['blk', 'pss', 'reb', 'cvr', 'kck'];
                } else if ((p.pos == "OL")) {
                    ratingKeys = ['blk', 'stl', 'pss', 'reb', 'cvr', 'kck'];
                } else if ((p.pos == "CB")) {
                    ratingKeys = ['blk', 'stl', 'drb', 'pss', 'kck'];
                } else if ((p.pos == "S")) {
                    ratingKeys = ['blk', 'stl', 'drb', 'pss', 'kck'];
                } else if ((p.pos == "LB")) {
                    ratingKeys = ['blk', 'stl', 'drb', 'kck'];
                } else if ((p.pos == "DL")) {
                    ratingKeys = ['blk', 'stl', 'drb', 'cvr', 'kck'];
                } else if ((p.pos == "K")) {
                    ratingKeys = ['stl', 'drb', 'pss', 'reb', 'cvr', 'blk'];
                }


            } else {


                if ((p.pos == "QB")) {
                    ratingKeys = ['hgt', 'jmp', 'stl', 'drb', 'pss', 'reb', 'cvr', 'kck'];
                } else if ((p.pos == "WR")) {
                    ratingKeys = ['hgt', 'jmp', 'blk', 'drb', 'pss', 'reb', 'cvr', 'kck'];
                } else if ((p.pos == "RB")) {
                    ratingKeys = ['hgt', 'jmp', 'blk', 'pss', 'reb', 'cvr', 'kck'];
                } else if ((p.pos == "TE")) {
                    ratingKeys = ['hgt', 'jmp', 'blk', 'pss', 'reb', 'cvr', 'kck'];
                } else if ((p.pos == "OL")) {
                    ratingKeys = ['hgt', 'jmp', 'blk', 'stl', 'pss', 'reb', 'cvr', 'kck'];
                } else if ((p.pos == "CB")) {
                    ratingKeys = ['hgt', 'jmp', 'blk', 'stl', 'drb', 'pss', 'kck'];
                } else if ((p.pos == "S")) {
                    ratingKeys = ['hgt', 'jmp', 'blk', 'stl', 'drb', 'pss', 'kck'];
                } else if ((p.pos == "LB")) {
                    ratingKeys = ['hgt', 'jmp', 'blk', 'stl', 'drb', 'kck'];
                } else if ((p.pos == "DL")) {
                    ratingKeys = ['hgt', 'jmp', 'blk', 'stl', 'drb', 'cvr', 'kck'];
                } else if ((p.pos == "K")) {
                    ratingKeys = ['hgt', 'jmp', 'stl', 'drb', 'pss', 'reb', 'cvr', 'blk'];
                }

            }
            for (j = 0; j < ratingKeys.length; j++) {
                p.ratings[r][ratingKeys[j]] = limitRating(p.ratings[r][ratingKeys[j]] + helpers.bound(random.gauss(1, 2) * baseChange, -100, 5));
            }

            // Update overall and potential
            p.ratings[r].ovr = ovr(p.ratings[r]);
            p.ratings[r].pot += -2 + Math.round(random.gauss(0, 2));
            if (p.ratings[r].ovr > p.ratings[r].pot || age > 28) {
                p.ratings[r].pot = p.ratings[r].ovr;
            }

        }

        // If this isn't here outside the loop, then 19 year old players could still have ovr > pot
        if (p.ratings[r].ovr > p.ratings[r].pot || age > 28) {
            p.ratings[r].pot = p.ratings[r].ovr;
        }

        // Likewise, If this isn't outside the loop, then 19 year old players don't get skills
        p.ratings[r].skills = skills(p.ratings[r]);


        if (generate) {
            age = g.season - p.born.year + years;
            p.born.year = g.season - age;
        }


        return p;
    }

    function genBaseMoods(ot) {
        return dao.teams.getAll({ ot: ot }).then(function (teams) {
            var baseMoods, i, s;

            baseMoods = [];

            s = teams[0].seasons.length - 1;  // Most recent season index

            for (i = 0; i < teams.length; i++) {
                // Special case for winning a title - basically never refuse to re-sign unless a miracle occurs
                if (teams[i].seasons[s].playoffRoundsWon === 4 && Math.random() < 0.99) {
                    baseMoods[i] = -0.25; // Should guarantee no refusing to re-sign
                } else {
                    baseMoods[i] = 0;

                    // Hype
                    baseMoods[i] += 0.5 * (1 - teams[i].seasons[s].hype);

                    // Facilities
                    baseMoods[i] += 0.1 * (finances.getRankLastThree(teams[i], "expenses", "facilities") - 1) / (g.numTeams - 1);

                    // Population
                    baseMoods[i] += 0.2 * (1 - teams[i].seasons[s].pop / 10);

                    // Randomness
                    baseMoods[i] += random.uniform(-0.2, 0.2);

                    baseMoods[i] = helpers.bound(baseMoods[i], 0, 1);
                }
            }

            return baseMoods;
        });
    }

    function genFuzz(scoutingRank) {
        var cutoff, fuzz, sigma;

        cutoff = 2 + 8 * (scoutingRank - 1) / (g.numTeams - 1);  // Max error is from 2 to 10, based on scouting rank
        sigma = 1 + 2 * (scoutingRank - 1) / (g.numTeams - 1);  // Stddev is from 1 to 3, based on scouting rank

        //        fuzz = random.gauss(0, sigma);
        fuzz = 0;
        if (fuzz > cutoff) {
            fuzz = cutoff;
        } else if (fuzz < -cutoff) {
            fuzz = -cutoff;
        }

        return fuzz;
    }

    function genRatings(profile, baseRating, pot, season, scoutingRank, tid) {
        var i, key, profileId, profiles, ratingKeys, ratings, rawRating, rawRatings, sigmas;

        if (profile === "Point") {   // QB
            profileId = 1;
        } else if (profile === "Wing") { //// RB
            profileId = 2;
        } else if (profile === "Big") { //// WR
            profileId = 3;
        } else if (profile === "Kicker") {  // kicker punter
            profileId = 4;
        } else if (profile === "QB") {
            profileId = 5;
        } else if (profile === "RB") {
            profileId = 6;
        } else if (profile === "TE") {
            profileId = 7;
        } else if (profile === "WR") {
            profileId = 8;
        } else if (profile === "OL") {
            profileId = 9;
        } else if (profile === "DL") {
            profileId = 10;
        } else if (profile === "LB") {
            profileId = 11;
        } else if (profile === "S") {
            profileId = 12;
        } else if (profile === "CB") {
            profileId = 13;
        } else {
            profileId = 0;
        }

        // Each row should sum to ~150 (need to include this)
        //// create profile for everyposition, update league and draft for proportion and check roster
        profiles = [[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 25, 10, 10, 10, 10, 10, 10, 10],  // Base 
        [30, -10, 30, 30, 30, 10, 15, -10, -10, -10, 0, 30, 30, -10, -10, -10, 0, 0],   // Point Gaurd (offense skill)
        [30, 10, 30, 30, 0, -10, 15, 15, 15, 15, 0, -10, -10, 10, 10, 30, 10, 0],  // Wing (defense field)
        [-10, 30, -10, -10, -10, 10, 15, 30, 30, 30, 0, -10, -10, 30, 30, 30, -10, -10],  // Big (linemen)
        [-10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, 50],  // Kicker
        [-10, 10, 20, 10, 10, 10, 50, 0, 10, 0, -10, 50, 10, 0, -0, 0, 0, 0],  // QB 150
        [40, 40, 10, 10, -10, 10, -10, 40, 40, 0, 0, -10, 10, 10, -10, -10, -10, -10],  // RB  150
        [10, 40, 10, 10, 10, 10, 20, 20, 40, 0, 0, -10, 30, 30, -10, -10, -10, -10],  // TE  150
        [40, 10, 10, 10, 10, 40, -10, 0, 20, 0, 0, -10, 50, 10, -10, -10, -10, -10],  // WR  150
        [-40, 40, 10, 10, 10, 30, 20, 20, 30, 0, 0, -10, -10, 50, -10, -10, -10, -10],  // OL  150
        [10, 40, 10, 10, 10, 20, 0, 0, 0, 40, 30, -10, -10, -10, 50, 40, -10, -10],  // DL  150
        [10, 40, 10, 10, 10, 10, 0, 0, 0, 30, 40, -10, 0, -10, 30, 40, 20, -10],  // LB  150 last
        [20, 20, 10, 10, 10, -10, 0, 0, 0, 20, 20, -10, 0, -10, 10, 30, 40, -10],  // S  150 last
        [30, 10, 10, 10, 10, -10, 0, 0, 0, 10, 10, -10, 0, -10, 0, 15, 50, -10]];  // CB  150 last

        sigmas = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        baseRating = random.gauss(baseRating, 5);

        rawRatings = [];
        for (i = 0; i < sigmas.length; i++) {
            rawRating = profiles[profileId][i] + baseRating;
            rawRatings[i] = limitRating(random.gauss(rawRating, sigmas[i]));
        }

        ratings = {};
        ratingKeys = ["hgt", "stre", "spd", "jmp", "endu", "hnd", "ins", "dnk", "ft", "fg", "tp", "blk", "stl", "drb", "pss", "reb", "cvr", "kck"];
        for (i = 0; i < ratingKeys.length; i++) {
            key = ratingKeys[i];
            ratings[key] = rawRatings[i];
        }

        // limit skills when young
        ratings.blk *= .5;
        ratings.stl *= .5;
        ratings.drb *= .5;
        ratings.pss *= .5;
        ratings.reb *= .5;
        ratings.cvr *= .5;
        ratings.kck *= .5;


        ratings.season = season;
        ratings.ovr = ovr(ratings);
        ratings.pot = pot;

        ratings.fuzz = genFuzz(scoutingRank);


        if (tid === g.PLAYER.UNDRAFTED_2) {
            ratings.fuzz *= 2;
        } else if (tid === g.PLAYER.UNDRAFTED_3) {
            ratings.fuzz *= 4;
        }

        ratings.skills = skills(ratings);

        return ratings;
    }

    function name(nationality) {
        var fn, fnRand, i, ln, lnRand;

        // First name
        fnRand = random.uniform(0, 90.04);
        for (i = 0; i < names.first.length; i++) {
            if (names.first[i][1] >= fnRand) {
                break;
            }
        }
        fn = names.first[i][0];


        // Last name
        lnRand = random.uniform(0, 77.48);
        for (i = 0; i < names.last.length; i++) {
            if (names.last[i][1] >= lnRand) {
                break;
            }
        }
        ln = names.last[i][0];

        return fn + " " + ln;
    }

    function pos(ratings) {
        var qb, rb, te, wr, position, ol, dl, lb, cb, s, k, offense, defense;
        var mainRating, safetyRating, tightEndRating, runningBackRating;

        qb = false;
        rb = false;
        te = false;
        wr = false;
        ol = false;
        dl = false;
        lb = false;
        cb = false;
        s = false;
        k = false;
        offense = false;
        defense = false;

        // Default position // make general, then get specific during set up
        if (ratings.drb > ratings.reb) {
            position = 'OL';
        } else {
            position = 'DL';
        }

        runningBackRating = ((ratings.dnk + ratings.ft + ratings.hgt + ratings.stre + ratings.spd + ratings.jmp) / 6) / 2;
        safetyRating = ((ratings.reb + ratings.cvr) / 2) * 1.1;
        tightEndRating = ((ratings.stl + ratings.drb) / 2) * 1.1;

        if (((ratings.blk >= tightEndRating) && (ratings.blk >= safetyRating) && (ratings.blk >= runningBackRating) && (ratings.blk >= ratings.stl) && (ratings.blk >= ratings.drb) && (ratings.blk >= ratings.pss) && (ratings.blk >= ratings.reb) && (ratings.blk >= ratings.cvr) && (ratings.blk >= ratings.kck))) {
            qb = true;
        }

        mainRating = ratings.stl;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr) && (mainRating > ratings.kck))) {
            wr = true;
        }

        mainRating = ratings.drb;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr) && (mainRating > ratings.kck))) {
            ol = true;
        }

        mainRating = ratings.pss;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.reb) && (mainRating > ratings.cvr) && (mainRating > ratings.kck))) {
            dl = true;
        }

        mainRating = ratings.reb;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.cvr) && (mainRating > ratings.kck))) {
            lb = true;
        }
        mainRating = ratings.cvr;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.kck))) {
            cb = true;
        }
        mainRating = ratings.kck;
        if (((mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr))) {
            k = true;
        }
        mainRating = tightEndRating;
        if (((mainRating > ratings.kck) && (mainRating > safetyRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr))) {
            te = true;
        }
        mainRating = safetyRating;
        if (((mainRating > ratings.kck) && (mainRating > tightEndRating) && (mainRating > runningBackRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr))) {
            s = true;
        }
        mainRating = runningBackRating;
        if (((mainRating > ratings.kck) && (mainRating > tightEndRating) && (mainRating > safetyRating) && (mainRating > ratings.blk) && (mainRating > ratings.stl) && (mainRating > ratings.drb) && (mainRating > ratings.pss) && (mainRating > ratings.reb) && (mainRating > ratings.cvr))) {
            rb = true;
        }

        if (qb) {
            position = 'QB';
        }
        if (rb) {
            position = 'RB';
        }
        if (te) {
            position = 'TE';
        } else if (wr) {
            position = 'WR';
        }
        if (dl) {
            position = 'DL';
        }
        if (lb) {
            position = 'LB';
        }
        if (s) {
            position = 'S';
        }
        if (cb) {
            position = 'CB';
        }
        if (k) {
            position = 'K';
        }

        return position;
    }

    function generate(tid, age, profile, baseRating, pot, draftYear, newLeague, scoutingRank) {
        var maxHgt, minHgt, maxWeight, minWeight, nationality, p;

        p = {}; // Will be saved to database
        p.tid = tid;
        p.statsTids = [];
        p.rosterOrder = 666;  // Will be set later
        p.ratings = [];
        if (newLeague) {
            // Create player for new league
            p.ratings.push(genRatings(profile, baseRating, pot, g.startingSeason, scoutingRank, tid));
        } else {
            // Create player to be drafted
            p.ratings.push(genRatings(profile, baseRating, pot, draftYear, scoutingRank, tid));
        }


        //http://www.sprayberryfootball.com/page/show/292837-nfl-player-specs
        minHgt = 68;  // 5'8"
        maxHgt = 82;  // 6'10"
        minWeight = 150;
        maxWeight = 290;

        p.pos = pos(p.ratings[0]);  // Position (PG, SG, SF, PF, C, G, GF, FC)

        if (p.pos == "QB") {
            minHgt = 72;  // 6'0"
            maxHgt = 78;  // 6'6"
            minWeight = 190;
            maxWeight = 240;
        } else if ((p.pos == "CB") || (p.pos == "S") || (p.pos == "WR")) {
            minHgt = 67;  // 5'7"
            maxHgt = 76;  // 6'4"
            minWeight = 190;
            maxWeight = 240;
        } else if (p.pos == "LB") {
            minHgt = 72;  // 6'0"
            maxHgt = 77;  // 6'5"
            minWeight = 210;
            maxWeight = 260;
        } else if (p.pos == "RB") {
            minHgt = 67;  // 5'7"
            maxHgt = 76;  // 6'4"
            minWeight = 190;
            maxWeight = 240;
        } else if (p.pos == "TE") {
            minHgt = 73;  // 6'1"
            maxHgt = 78;  // 6'6"
            minWeight = 230;
            maxWeight = 270;
        } else if (p.pos == "DL") {
            minHgt = 73;  // 6'1"
            maxHgt = 78;  // 6'6"
            minWeight = 230;
            maxWeight = 330;
        } else if (p.pos == "OL") {
            minHgt = 75;  // 6'3"
            maxHgt = 78;  // 6'6"
            minWeight = 270;
            maxWeight = 340;
        } else if (p.pos == "K") {
            minHgt = 71;  // 5'11"
            maxHgt = 76;  // 6'4"
            minWeight = 160;
            maxWeight = 220;
        }
        p.hgt = Math.round(random.randInt(-2, 2) + p.ratings[0].endu * (maxHgt - minHgt) / 100 + minHgt);  // Height in inches (from minHgt to maxHgt)	
        p.weight = Math.round(random.randInt(-20, 20) + (p.ratings[0].endu + 0.5 * p.ratings[0].stre) * (maxWeight - minWeight) / 150 + minWeight);  // Weight in pounds (from minWeight to maxWeight)

        if ((p.pos == "QB") || (p.pos == "RB") || (p.pos == "TE") || (p.pos == "WR") || (p.pos == "OL")) {
            p.offDefK = "off";
        } else if (p.pos == "K") {
            p.offDefK = "k";
        } else {
            p.offDefK = "def";
        }
        p.active = false; // Delete after real roster ordering AI exists

        // Randomly choose nationality  
        nationality = 'USA';
        p.born = {
            year: g.season - age,
            loc: nationality
        };

        p.name = name(nationality);
        p.college = "";
        p.imgURL = ""; // Custom rosters can define player image URLs to be used rather than vector faces

        p.awards = [];

        p.freeAgentMood = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        p.yearsFreeAgent = 0;
        p.retiredYear = null;

        p.draft = {
            round: 0,
            pick: 0,
            tid: -1,
            originalTid: -1,
            year: draftYear,
            teamName: null,
            teamRegion: null,
            pot: pot,
            ovr: p.ratings[0].ovr,
            skills: p.ratings[0].skills
        };

        p.face = faces.generate();
        p.injury = { type: "Healthy", gamesRemaining: 0 };

        p.ptModifier = 1;

        p.hof = false;
        p.watch = false;
        p.gamesUntilTradable = 0;

        // These should be set by player.updateValues after player is completely done (automatic in player.develop)
        p.value = 0;
        p.valueNoPot = 0;
        p.valueFuzz = 0;
        p.valueNoPotFuzz = 0;
        p.valueWithContract = 0;

        // Must be after value*s are set, because genContract depends on them
        p.salaries = [];
        p = setContract(p, genContract(p), false);

        return p;
    }

    function value(p, ps, options) {
        var age, current, i, potential, pr, ps, ps1, ps2, s, worth, worthFactor;
        var positionBonus;

        options = options !== undefined ? options : {};
        options.noPot = options.noPot !== undefined ? options.noPot : false;
        options.fuzz = options.fuzz !== undefined ? options.fuzz : false;
        options.withContract = options.withContract !== undefined ? options.withContract : false;


        if (ps === undefined) { console.log("NO STATS"); ps = []; }

        // Current ratings
        pr = {}; // Start blank, add what we need (efficiency, wow!)
        s = p.ratings.length - 1; // Latest season
        //console.log(p.pos);



        //	console.log(p.pos+" "+pr.bonus);

        // Fuzz?
        if (options.fuzz) {
            pr.ovr = Math.round(helpers.bound(p.ratings[s].ovr + p.ratings[s].fuzz, 0, 100));
            pr.pot = Math.round(helpers.bound(p.ratings[s].pot + p.ratings[s].fuzz, 0, 100));
        } else {
            pr.ovr = p.ratings[s].ovr;
            pr.pot = p.ratings[s].pot;
        }

        if (p.pos == "QB") {
            if (pr.pot > 70) {
                pr.bonus = 1.05;
            } else {
                pr.bonus = 1.0;
            }
            if (pr.ovr > 60) {
                pr.bonus *= 1.05;
            } else {
                pr.bonus = 1.0;
            }
        } else if (p.pos == "RB") {
            pr.bonus = .93;
        } else if (p.pos == "WR") {
            pr.bonus = .99;
        } else if (p.pos == "TE") {
            //			pr.bonus = .98;
            pr.bonus = 0.97;

        } else if (p.pos == "S") {
            pr.bonus = 0.99;
            //			pr.bonus = .98;
        } else if (p.pos == "CB") {
            pr.bonus = 0.99;
        } else if (p.pos == "OL") {
            pr.bonus = 0.96;
        } else if (p.pos == "DL") {
            pr.bonus = 1.02;
            //pr.bonus = 1.02;
        } else if (p.pos == "LB") {
            pr.bonus = 1.04;
            //			pr.bonus = 1.02;
        } else if (p.pos == "K") {
            pr.bonus = 0.85;
        } else {
            pr.bonus = 1.0;
        }


        // 1. Account for stats (and current ratings if not enough stats)
        current = pr.ovr * pr.bonus; // No stats at all? Just look at ratings more, then.

        // Short circuit if we don't care about potential
        if (options.noPot) {
            return current;
        }

        // 2. Potential
        potential = pr.pot * pr.bonus;

        // If performance is already exceeding predicted potential, just use that
        if (current >= potential && age < 29) {
            return current;
        }

        // Otherwise, combine based on age
        if (p.draft.year > g.season) {
            // Draft prospect
            age = p.draft.year - p.born.year;
        } else {
            age = g.season - p.born.year;
        }
        if (age <= 23) {
            return 0.4 * potential + 0.6 * current;
        }
        if (age === 24) {
            return 0.25 * potential + 0.75 * current;
        }
        if (age === 25) {
            return 0.1 * potential + 0.9 * current;
        }
        if (age > 25 && age < 29) {
            return current;
        }
        if (age === 29) {
            return 0.975 * current;
        }
        if (age === 30) {
            return 0.95 * current;
        }
        if (age === 31) {
            return 0.9 * current;
        }
        if (age === 32) {
            return 0.85 * current;
        }
        if (age === 33) {
            return 0.8 * current;
        }
        if (age > 33) {
            return 0.7 * current;
        }
    }
});

// team.js
function generate(tm) {
    var strategy, t;

    if (tm.hasOwnProperty("strategy")) {
        strategy = tm.strategy;
    } else {
        strategy = Math.random() > 0.5 ? "contending" : "rebuilding";
    }

    t = {
        tid: tm.tid,
        cid: tm.cid,
        did: tm.did,
        region: tm.region,
        name: tm.name,
        abbrev: tm.abbrev,
        imgURL: tm.imgURL !== undefined ? tm.imgURL : "",
        stats: tm.hasOwnProperty("stats") ? tm.stats : [],
        seasons: tm.hasOwnProperty("seasons") ? tm.seasons : [],
        budget: {
            ticketPrice: {
                amount: tm.hasOwnProperty("budget") ? tm.budget.ticketPrice.amount : helpers.round(25 + 25 * (g.numTeams - tm.popRank) / (g.numTeams - 1), 2),
                rank: tm.hasOwnProperty("budget") ? tm.budget.ticketPrice.rank : tm.popRank
            },
            scouting: {
                amount: tm.hasOwnProperty("budget") ? tm.budget.scouting.amount : helpers.round(900 + 900 * (g.numTeams - tm.popRank) / (g.numTeams - 1)) * 10,
                rank: tm.hasOwnProperty("budget") ? tm.budget.scouting.rank : tm.popRank
            },
            coaching: {
                amount: tm.hasOwnProperty("budget") ? tm.budget.coaching.amount : helpers.round(900 + 900 * (g.numTeams - tm.popRank) / (g.numTeams - 1)) * 10,
                rank: tm.hasOwnProperty("budget") ? tm.budget.coaching.rank : tm.popRank
            },
            health: {
                amount: tm.hasOwnProperty("budget") ? tm.budget.health.amount : helpers.round(900 + 900 * (g.numTeams - tm.popRank) / (g.numTeams - 1)) * 10,
                rank: tm.hasOwnProperty("budget") ? tm.budget.health.rank : tm.popRank
            },
            facilities: {
                amount: tm.hasOwnProperty("budget") ? tm.budget.facilities.amount : helpers.round(900 + 900 * (g.numTeams - tm.popRank) / (g.numTeams - 1)) * 10,
                rank: tm.hasOwnProperty("budget") ? tm.budget.facilities.rank : tm.popRank
            }
        },
        strategy: strategy
    };

    if (!tm.hasOwnProperty("seasons")) {
        t = addSeasonRow(t);
        t.seasons[0].pop = tm.pop;
    }
    if (!tm.hasOwnProperty("stats")) {
        t = addStatsRow(t);
    }


    return t;
}

// league.js Create function
function create(name, tid, leagueFile, startingSeason, randomizeRosters) {
    var i, phaseText, skipNewPhase, teams, teamsDefault;

    // Any user input?
    if (!leagueFile) {
        leagueFile = {}; // Allow checking of properties
    }

    // Default teams
    teamsDefault = helpers.getTeamsDefault();

    // Any custom teams?
    if (leagueFile.hasOwnProperty("teams")) {
        teams = merge(leagueFile.teams, teamsDefault);
        // Add in popRanks
        teams = helpers.addPopRank(teams);
    } else {
        teams = teamsDefault;
    }

    // Handle random team
    if (tid === -1) {
        tid = random.randInt(0, teams.length - 1);
    }

    if (leagueFile.hasOwnProperty("meta") && leagueFile.meta.hasOwnProperty("phaseText")) {
        phaseText = leagueFile.meta.phaseText;
    } else {
        phaseText = "";
    }

    // Record in meta db
    return dao.leagues.add({
        value: {
            name: name,
            tid: tid,
            phaseText: phaseText,
            teamName: teams[tid].name,
            teamRegion: teams[tid].region
        }
    }).then(function (lid) {
        g.lid = lid;

        // Create new league database
        // Create new league database
        return db.connectLeague(g.lid);
    }).then(function () {
        var gameAttributes, i;

        // Default values				
        gameAttributes = {
            userTid: tid,
            userTids: [tid],
            season: startingSeason,
            startingSeason: startingSeason,
            phase: 0,
            nextPhase: null, // Used only for fantasy draft
            daysLeft: 0, // Used only for free agency
            gamesInProgress: false,
            phaseChangeInProgress: false,
            stopGames: false,
            lastDbChange: 0,
            leagueName: name,
            ownerMood: {
                wins: 0,
                playoffs: 0,
                money: 0
            },
            gameOver: false,
            teamAbbrevsCache: _.pluck(teams, "abbrev"),
            teamRegionsCache: _.pluck(teams, "region"),
            teamNamesCache: _.pluck(teams, "name"),
            showFirstOwnerMessage: true, // true when user starts with a new team, so initial owner message can be shown
            gracePeriodEnd: startingSeason + 2, // Can't get fired for the first two seasons
            numTeams: teams.length, // Will be 30 if the user doesn't supply custom rosters
            autoPlaySeasons: 0,
            customRosterMode: false,
            godMode: false,
            godModeInPast: false
        };

        // gameAttributes from input
        skipNewPhase = false;
        if (leagueFile.hasOwnProperty("gameAttributes")) {
            for (i = 0; i < leagueFile.gameAttributes.length; i++) {
                // Set default for anything except team ID and name, since they can be overwritten by form input.
                if (leagueFile.gameAttributes[i].key !== "userTid" && leagueFile.gameAttributes[i].key !== "leagueName") {
                    gameAttributes[leagueFile.gameAttributes[i].key] = leagueFile.gameAttributes[i].value;
                }


                if (leagueFile.gameAttributes[i].key === "phase") {
                    skipNewPhase = true;
                }
            }
            // Special case for userTids - don't use saved value if userTid is not in it
            if (gameAttributes.userTids.indexOf(gameAttributes.userTid) < 0) {
                gameAttributes.userTids = [gameAttributes.userTid];
            }

        }

        // Clear old game attributes from g, to make sure the new ones are saved to the db in setGameAttributes
        helpers.resetG();

        return setGameAttributes(null, gameAttributes);
    }).then(function () {
        var i, j, t, round, scoutingRank, toMaybeAdd, tx;

        // Probably is fastest to use this transaction for everything done to create a new league
        tx = dao.tx(["draftPicks", "draftOrder", "players", "playerStats", "teams", "trade", "releasedPlayers", "awards", "schedule", "playoffSeries", "negotiations", "messages", "games"], "readwrite");

        // Draft picks for the first 4 years, as those are the ones can be traded initially
        if (leagueFile.hasOwnProperty("draftPicks")) {
            for (i = 0; i < leagueFile.draftPicks.length; i++) {
                dao.draftPicks.add({ ot: tx, value: leagueFile.draftPicks[i] });
            }
        } else {
            for (i = 0; i < 4; i++) {
                for (t = 0; t < g.numTeams; t++) {
                    for (round = 1; round <= 5; round++) {
                        dao.draftPicks.add({
                            ot: tx,
                            value: {
                                tid: t,
                                originalTid: t,
                                round: round,
                                season: g.startingSeason + i
                            }
                        });
                    }
                }
            }
        }

        // Initialize draft order object store for later use
        if (leagueFile.hasOwnProperty("draftOrder")) {
            for (i = 0; i < leagueFile.draftOrder.length; i++) {
                dao.draftOrder.add({ ot: tx, value: leagueFile.draftOrder[i] });
            }
        } else {
            dao.draftOrder.add({
                ot: tx,
                value: {
                    rid: 1,
                    draftOrder: []
                }
            });
        }

        // teams already contains tid, cid, did, region, name, and abbrev. Let's add in the other keys we need for the league.
        for (i = 0; i < g.numTeams; i++) {
            t = team.generate(teams[i]);
            dao.teams.add({ ot: tx, value: t });

            // Save scoutingRank for later
            if (i === g.userTid) {
                scoutingRank = finances.getRankLastThree(t, "expenses", "scouting");
            }
        }

        if (leagueFile.hasOwnProperty("trade")) {
            for (i = 0; i < leagueFile.trade.length; i++) {
                dao.trade.add({ ot: tx, value: leagueFile.trade[i] });
            }
        } else {
            dao.trade.add({
                ot: tx,
                value: {
                    rid: 0,
                    teams: [
                        {
                            tid: tid,
                            pids: [],
                            dpids: []
                        },
                        {
                            tid: tid === 0 ? 1 : 0,  // Load initial trade view with the lowest-numbered non-user team (so, either 0 or 1).
                            pids: [],
                            dpids: []
                        }
                    ]
                }
            });
        }

        // These object stores are blank by default
        toMaybeAdd = ["releasedPlayers", "awards", "schedule", "playoffSeries", "negotiations", "messages", "games"];
        for (j = 0; j < toMaybeAdd.length; j++) {
            if (leagueFile.hasOwnProperty(toMaybeAdd[j])) {
                for (i = 0; i < leagueFile[toMaybeAdd[j]].length; i++) {
                    dao[toMaybeAdd[j]].add({
                        ot: tx,
                        value: leagueFile[toMaybeAdd[j]][i]
                    });
                }
            }
        }


        return player.genBaseMoods(tx).then(function (baseMoods) {
            var agingYears, baseRatings, draftYear, goodNeutralBad, i, j, n, numLeft, p, players, pots, profile, profiles, randomizeExpiration, t, t2, playerTids;
            // Either add players from league file or generate them
            if (leagueFile.hasOwnProperty("players")) {
                // Use pre-generated players, filling in attributes as needed
                players = leagueFile.players;

                // Does the player want the rosters randomized?
                if (randomizeRosters) {
                    console.log("washere");
                    // Assign the team ID of all players to the 'playerTids' array.
                    // Check tid to prevent draft prospects from being swapped with established players
                    playerTids = _.pluck(players.filter(function (p) { return p.tid >= g.PLAYER.FREE_AGENT; }), "tid");
                    // Shuffle the teams that players are assigned to.
                    random.shuffle(playerTids);
                    for (i = 0; i < players.length; i++) {
                        if (players[i].tid >= g.PLAYER.FREE_AGENT) {
                            players[i].tid = playerTids.pop();
                        }
                    }
                }

                players.forEach(function (p) {
                    var playerStats;

                    p = player.augmentPartialPlayer(p, scoutingRank);

                    // Don't let imported contracts be created for below the league minimum, and round to nearest $10,000.
                    p.contract.amount = Math.max(10 * helpers.round(p.contract.amount / 10), g.minContract);

                    // Separate out stats
                    playerStats = p.stats;
                    delete p.stats;

                    player.updateValues(tx, p, playerStats.reverse()).then(function (p) {
                        dao.players.put({ ot: tx, value: p }).then(function (pid) {
                            var addStatsRows;

                            // When adding a player, this is the only way to know the pid
                            p.pid = pid;

                            // If no stats in League File, create blank stats rows for active players if necessary
                            if (playerStats.length === 0) {
                                if (p.tid >= 0 && g.phase <= g.PHASE.PLAYOFFS) {
                                    // Needs pid, so must be called after put. It's okay, statsTid was already set in player.augmentPartialPlayer
                                    p = player.addStatsRow(tx, p, g.phase === g.PHASE.PLAYOFFS);
                                }
                            } else {
                                // If there are stats in the League File, add them to the database
                                addStatsRows = function () {
                                    var ps;

                                    ps = playerStats.pop();

                                    // Augment with pid, if it's not already there - can't be done in player.augmentPartialPlayer because pid is not known at that point
                                    ps.pid = p.pid;

                                    // Could be calculated correctly if I wasn't lazy
                                    if (!ps.hasOwnProperty("yearsWithTeam")) {
                                        ps.yearsWithTeam = 1;
                                    }

                                    // Delete psid because it can cause problems due to interaction addStatsRow above
                                    delete ps.psid;

                                    dao.playerStats.add({ ot: tx, value: ps }).then(function () {
                                        // On to the next one
                                        if (playerStats.length > 0) {
                                            addStatsRows();
                                        }
                                    });
                                };
                                addStatsRows();
                            }
                        });
                    });
                });
            } else {
                console.log("undefined");
                // No players in league file, so generate new players
                profiles = ["QB", "WR", "RB", "TE", "OL", "DL", "LB", "S", "CB", "Kicker", "OL", "DL", "LB", "LB", "OL", "WR", ""];
                baseRatings = [37, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 26, 26, 26, 37, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 26, 26, 26, 37, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 26, 26, 26, 37, 37, 36, 35, 34, 33, 32, 31, 30, 29, 29];
                pots = [75, 85, 85, 75, 70, 90, 70, 90, 75, 80, 90, 85, 75, 85, 75, 85, 70, 80, 90, 90, 90, 70, 75, 80, 80, 70, 85, 85, 75, 75, 75, 85, 90, 80, 70, 80, 75, 70, 70, 80, 85, 75, 75, 75, 85, 85, 90, 80, 70, 80, 75, 70, 70];

                for (t = teams.length - 1; t > -11; t--) {
                    // Create multiple "teams" worth of players for the free agent pool
                    let adjustment;
                    if (t < 0) {
                        t2 = g.PLAYER.FREE_AGENT;
                        adjustment = -20;
                    } else {
                        t2 = t;
                        adjustment = 0;
                    }

                    goodNeutralBad = random.randInt(-1, 1);  // determines if this will be a good team or not
                    random.shuffle(pots);
                    for (n = 0; n < 53; n++) {
                        profile = profiles[random.randInt(0, profiles.length - 1)];

                        agingYears = random.randInt(0, 10);
                        draftYear = g.startingSeason - 1 - agingYears;
                        let adjustment2 = 0;
                        if (agingYears > 5) {
                            adjustment2 += 10;
                        }
                        if (agingYears > 8) {
                            adjustment2 += 1;
                        }
                        if (agingYears >= 12) {
                            adjustment2 += 1;
                        }
                        let baseRating = random.randInt(-3, 3) + 22 + adjustment + adjustment2;
                        let pot = random.randInt(-10, 10) + 75 + adjustment;

                        // Generate player **********************************************************************************
                        p = player.generate(t2, 21, profile, baseRating, pot, draftYear, true, scoutingRank);
                        p = player.develop(p, agingYears, true);
                        if (n < 5) {
                            p = player.bonus(p, goodNeutralBad * random.randInt(0, 20));
                        } else {
                            p = player.bonus(p, 0);
                        }
                        if (t2 === g.PLAYER.FREE_AGENT) {  // Free agents
                            p = player.bonus(p, -15);
                        }
                        // Hack to account for player.addStatsRow being called after dao.players.put - manually assign statsTids
                        if (p.tid >= 0) {
                            p.statsTids = [p.tid];
                        }

                        // Update player values after ratings changes
                        player.updateValues(tx, p, []).then(function (p) {
                            var randomizeExp;

                            // Randomize contract expiration for players who aren't free agents, because otherwise contract expiration dates will all be synchronized
                            randomizeExp = (p.tid !== g.PLAYER.FREE_AGENT);

                            // Update contract based on development. Only write contract to player log if not a free agent.
                            p = player.setContract(p, player.genContract(p, randomizeExp), p.tid >= 0);

                            // Save to database
                            if (p.tid === g.PLAYER.FREE_AGENT) {
                                player.addToFreeAgents(tx, p, null, baseMoods);
                            } else {
                                dao.players.put({ ot: tx, value: p }).then(function (pid) {
                                    // When adding a player, this is the only way to know the pid
                                    p.pid = pid;

                                    // Needs pid, so must be called after put. It's okay, statsTid was already set above
                                    p = player.addStatsRow(tx, p, g.phase === g.PHASE.PLAYOFFS);
                                });
                            }
                        });
                    }

                    // Initialize rebuilding/contending, when possible
                    if (t2 >= 0) {
                        dao.teams.get({ ot: tx, key: t2 }).then(function (t) {
                            t.strategy = goodNeutralBad === 1 ? "contending" : "rebuilding";
                            dao.teams.put({ ot: tx, value: t });
                        });
                    }
                }
            }

            return tx.complete().then(function () {
                return players;
            });
        }).then(function (players) {
            var createUndrafted1, createUndrafted2, createUndrafted3, i, tx;

            // Use a new transaction so there is no race condition with generating draft prospects and regular players (PIDs can seemingly collide otherwise, if it's an imported roster)
            tx = dao.tx(["players", "playerStats"], "readwrite");

            // See if imported roster has draft picks included. If so, create less than 70 (scaled for number of teams)
            createUndrafted1 = Math.round(175 * g.numTeams / 30);
            createUndrafted2 = Math.round(175 * g.numTeams / 30);
            createUndrafted3 = Math.round(175 * g.numTeams / 30); // 

            if (players !== undefined) {
                for (i = 0; i < players.length; i++) {
                    if (players[i].tid === g.PLAYER.UNDRAFTED) {
                        createUndrafted1 -= 1;
                    } else if (players[i].tid === g.PLAYER.UNDRAFTED_2) {
                        createUndrafted2 -= 1;
                    } else if (players[i].tid === g.PLAYER.UNDRAFTED_3) {
                        createUndrafted3 -= 1;
                    }
                }
            }
            // If the draft has already happened this season but next year's class hasn't been bumped up, don't create any g.PLAYER.UNDRAFTED
            if (createUndrafted1 && (g.phase <= g.PHASE.BEFORE_DRAFT || g.phase >= g.PHASE.FREE_AGENCY)) {
                draft.genPlayers(tx, g.PLAYER.UNDRAFTED, scoutingRank, createUndrafted1);
            }
            if (createUndrafted2) {
                draft.genPlayers(tx, g.PLAYER.UNDRAFTED_2, scoutingRank, createUndrafted2);
            }
            if (createUndrafted3) {
                draft.genPlayers(tx, g.PLAYER.UNDRAFTED_3, scoutingRank, createUndrafted3);
            }

            return tx.complete().then(function () {
                if (skipNewPhase) {
                    // Game already in progress, just start it
                    return g.lid;
                }
                // Make schedule, start season
                return phase.newPhase(g.PHASE.REGULAR_SEASON).then(function () {
                    var lid, tx;

                    ui.updateStatus("Idle");

                    lid = g.lid; // Otherwise, g.lid can be overwritten before the URL redirects, and then we no longer know the league ID

                    helpers.bbgmPing("league");


                    // Auto sort rosters
                    tx = dao.tx("players", "readwrite");
                    return Promise.each(teams, function (t) {
                        return team.rosterAutoSort(tx, t.tid);
                    }).then(function () {
                        return lid;
                    });
                });
            });
        });
    });
}