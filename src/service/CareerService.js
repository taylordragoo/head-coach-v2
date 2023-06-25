import Dexie from 'dexie';

export default class CareerService {

    async handleCreateNewCareer(request) {
        const db = new Dexie(request.db);

        db.version(1).stores({
            user: "id",
            teams: "id",
            players: "id",
            world: 'id',
            leagues: "id",
            champions: "$id",
            counters: "id",
            synergys: "id",
            // attributes: "id",
            // born: "id",
            // contract: "id",
            // salaries: "id",
            // stats: "id",
        });

        if (!(await Dexie.exists(db.name))) {
            console.log(db.name + " Db does not exist");
        } else {
            console.log(db.name + " db does exist")
            await db.open().catch(function(err) {
                console.error('Failed to open db: ' + (err.stack || err));
            }).finally(function() {
                console.log(db.tables);
            });
        }

        const userTable = db.table('user')
        const worldTable = db.table('world')
        const playersTable = db.table('players')
        const teamsTable = db.table('teams')
        const leaguesTable = db.table('leagues')
        const champsTable = db.table('champions')
        const counterTable = db.table('counters')
        const synergysTable = db.table('synergys')

        // const attributesTable = db.table('attributes')
        // const bornTable = db.table('born')
        // const contractTable = db.table('contract')
        // const salariesTable = db.table('salaries')
        // const statsTable = db.table('stats')

        try {

            if (userTable) {
                userTable.put(request.user).then(function(lastKey) {
                    console.log("Last user's id was: " + lastKey); // Will be 100000.
                }).catch(Dexie.BulkError, function(e) {
                    // Explicitely catching the bulkAdd() operation makes those successful
                    // additions commit despite that there were errors.
                    console.error("Some users did not succeed. However, " +
                        100000 - e.failures.length + " users was added successfully");
                });
            }

            if (playersTable) {
                playersTable.bulkPut(request.players).then(function(lastKey) {
                    console.log("Last player's id was: " + lastKey); // Will be 100000.
                }).catch(Dexie.BulkError, function(e) {
                    // Explicitely catching the bulkAdd() operation makes those successful
                    // additions commit despite that there were errors.
                    console.error("Some players did not succeed. However, " +
                        100000 - e.failures.length + " players was added successfully");
                });
            }

            if (worldTable) {
                worldTable.put(request.world).then(function(lastKey) {
                    console.log("Last world's id was: " + lastKey); // Will be 100000.
                }).catch(Dexie.Error, function(e) {
                    // Explicitely catching the bulkAdd() operation makes those successful
                    // additions commit despite that there were errors.
                    console.error("Some worlds did not succeed. However, " +
                        100000 - e.failures.length + " worlds was added successfully");
                });
            }

            if (teamsTable) {
                teamsTable.bulkPut(request.teams).then(function(lastKey) {
                    console.log("Last teams's id was: " + lastKey); // Will be 100000.
                }).catch(Dexie.BulkError, function(e) {
                    // Explicitely catching the bulkAdd() operation makes those successful
                    // additions commit despite that there were errors.
                    console.error("Some teams did not succeed. However, " +
                        100000 - e.failures.length + " teams was added successfully");
                });
            }

            if (leaguesTable) {
                leaguesTable.bulkPut(request.leagues).then(function(lastKey) {
                    console.log("Last leagues's id was: " + lastKey); // Will be 100000.
                }).catch(Dexie.BulkError, function(e) {
                    // Explicitely catching the bulkAdd() operation makes those successful
                    // additions commit despite that there were errors.
                    console.error("Some leagues did not succeed. However, " +
                        100000 - e.failures.length + " leagues was added successfully");
                });
            }

            if (champsTable) {
                db.champions.bulkPut(request.champions).then(function(lastKey) {
                    console.log("Last champion id was: " + lastKey); // Will be 100000.
                }).catch(Dexie.BulkError, function(e) {
                    // Explicitely catching the bulkAdd() operation makes those successful
                    // additions commit despite that there were errors.
                    console.error("Some teams did not succeed. However, " +
                        100000 - e.failures.length + " teams was added successfully");
                });
            }

            if (counterTable) {
                db.counters.bulkPut(request.counters).then(function(lastKey) {
                    console.log("Last counter id was: " + lastKey); // Will be 100000.
                }).catch(Dexie.BulkError, function(e) {
                    // Explicitely catching the bulkAdd() operation makes those successful
                    // additions commit despite that there were errors.
                    console.error("Some teams did not succeed. However, " +
                        100000 - e.failures.length + " teams was added successfully");
                });
            }

            if (synergysTable){
                db.synergys.bulkPut(request.synergys).then(function(lastKey) {
                    console.log("Last synergy id was: " + lastKey); // Will be 100000.
                }).catch(Dexie.BulkError, function(e) {
                    // Explicitely catching the bulkAdd() operation makes those successful
                    // additions commit despite that there were errors.
                    console.error("Some teams did not succeed. However, " +
                        100000 - e.failures.length + " teams was added successfully");
                });
            }

            // if (attributesTable) {
            //     attributesTable.bulkPut(request.attributes).then(function(lastKey) {
            //         console.log("Last attribute's id was: " + lastKey); // Will be 100000.
            //     }).catch(Dexie.BulkError, function(e) {
            //         // Explicitely catching the bulkAdd() operation makes those successful
            //         // additions commit despite that there were errors.
            //         console.error("Some teams did not succeed. However, " +
            //             100000 - e.failures.length + " teams was added successfully");
            //     });
            // }
            //
            // if (bornTable) {
            //     bornTable.bulkPut(request.born).then(function(lastKey) {
            //         console.log("Last born id was: " + lastKey); // Will be 100000.
            //     }).catch(Dexie.BulkError, function(e) {
            //         // Explicitely catching the bulkAdd() operation makes those successful
            //         // additions commit despite that there were errors.
            //         console.error("Some teams did not succeed. However, " +
            //             100000 - e.failures.length + " teams was added successfully");
            //     });
            // }
            //
            // if (contractTable) {
            //     contractTable.bulkPut(request.contract).then(function(lastKey) {
            //         console.log("Last contract id was: " + lastKey); // Will be 100000.
            //     }).catch(Dexie.BulkError, function(e) {
            //         // Explicitely catching the bulkAdd() operation makes those successful
            //         // additions commit despite that there were errors.
            //         console.error("Some teams did not succeed. However, " +
            //             100000 - e.failures.length + " teams was added successfully");
            //     });
            // }
            //
            // if (salariesTable) {
            //     salariesTable.bulkPut(request.salaries).then(function(lastKey) {
            //         console.log("Last salaries id was: " + lastKey); // Will be 100000.
            //     }).catch(Dexie.BulkError, function(e) {
            //         // Explicitely catching the bulkAdd() operation makes those successful
            //         // additions commit despite that there were errors.
            //         console.error("Some teams did not succeed. However, " +
            //             100000 - e.failures.length + " teams was added successfully");
            //     });
            // }
            //
            // if (statsTable) {
            //     statsTable.bulkPut(request.stats).then(function(lastKey) {
            //         console.log("Last stats id was: " + lastKey); // Will be 100000.
            //     }).catch(Dexie.BulkError, function(e) {
            //         // Explicitely catching the bulkAdd() operation makes those successful
            //         // additions commit despite that there were errors.
            //         console.error("Some teams did not succeed. However, " +
            //             100000 - e.failures.length + " teams was added successfully");
            //     });
            // }

        } catch (err) {
            console.log("Error: " + err)
        } finally {
            return db;
        }
    }

    handleCreateDefaultDatabase(request) {
        console.log("Creating Default Database " + JSON.stringify(request.teams.length))
        const db = new Dexie(request.db_name);

        db.version(1).stores({
            user: "id",
            teams: "id",
            players: "id",
            world: 'id',
            leagues: "id",
            champions: "$id",
            counters: "id",
            synergys: "id",
        });

        try {

            db.world.put(request.world).then(function(lastKey) {
                console.log("Last world's id was: " + lastKey); // Will be 100000.
            }).catch(Dexie.BulkError, function(e) {
                // Explicitely catching the bulkAdd() operation makes those successful
                // additions commit despite that there were errors.
                console.error("Some worlds did not succeed. However, " +
                    100000 - e.failures.length + " worlds was added successfully");
            });

            db.leagues.bulkPut(request.leagues).then(function(lastKey) {
                console.log("Last leagues's id was: " + lastKey); // Will be 100000.
            }).catch(Dexie.BulkError, function(e) {
                // Explicitely catching the bulkAdd() operation makes those successful
                // additions commit despite that there were errors.
                console.error("Some leagues did not succeed. However, " +
                    100000 - e.failures.length + " leagues was added successfully");
            });

            db.champions.bulkPut(request.champions).then(function(lastKey) {
                console.log("Last champion id was: " + lastKey); // Will be 100000.
            }).catch(Dexie.BulkError, function(e) {
                // Explicitely catching the bulkAdd() operation makes those successful
                // additions commit despite that there were errors.
                console.error("Some teams did not succeed. However, " +
                    100000 - e.failures.length + " teams was added successfully");
            });

            db.counters.bulkPut(request.counters).then(function(lastKey) {
                console.log("Last counter id was: " + lastKey); // Will be 100000.
            }).catch(Dexie.BulkError, function(e) {
                // Explicitely catching the bulkAdd() operation makes those successful
                // additions commit despite that there were errors.
                console.error("Some teams did not succeed. However, " +
                    100000 - e.failures.length + " teams was added successfully");
            });

            db.synergys.bulkPut(request.synergys).then(function(lastKey) {
                console.log("Last synergy id was: " + lastKey); // Will be 100000.
            }).catch(Dexie.BulkError, function(e) {
                // Explicitely catching the bulkAdd() operation makes those successful
                // additions commit despite that there were errors.
                console.error("Some teams did not succeed. However, " +
                    100000 - e.failures.length + " teams was added successfully");
            });

            console.log(request.players[0])
            db.players.bulkPut(request.players).then(function(lastKey) {
                console.log("Last player's id was: " + lastKey); // Will be 100000.
            }).catch(Dexie.BulkError, function(e) {
                // Explicitely catching the bulkAdd() operation makes those successful
                // additions commit despite that there were errors.
                console.error("Some players did not succeed. However, " +
                    100000 - e.failures.length + " players was added successfully");
            });

            db.teams.bulkPut(request.teams).then(function(lastKey) {
                console.log("Last teams's id was: " + lastKey); // Will be 100000.
            }).catch(Dexie.BulkError, function(e) {
                // Explicitely catching the bulkAdd() operation makes those successful
                // additions commit despite that there were errors.
                console.error("Some teams did not succeed. However, " +
                    100000 - e.failures.length + " teams was added successfully");
            });

        } catch (err) {
            console.log("Error: " + err)
        } finally {
            return db;
        }
    }

    async handleSaveCareer(request) {
        console.log("Save Database " + request.user)
        const db = new Dexie(request.db);

        if (!(await Dexie.exists(db.name))) {
            console.log(db.name + " Db does not exist");
        } else {
            console.log(db.name + " db does exist")
            await db.open().catch(function(err) {
                console.error('Failed to open db: ' + (err.stack || err));
            }).finally(function() {
                console.log(db.tables);
            });

            const userTable = db.table('user')
            const worldTable = db.table('world')
            const playersTable = db.table('players')
            const teamsTable = db.table('teams')
            const leaguesTable = db.table('leagues')
            const champsTable = db.table('champions')
            const counterTable = db.table('counters')
            const synergysTable = db.table('synergys')

            // const attributesTable = db.table('attributes')
            // const bornTable = db.table('born')
            // const contractTable = db.table('contract')
            // const salariesTable = db.table('salaries')
            // const statsTable = db.table('stats')

            try {

                if (userTable) {
                    userTable.put(request.user).then(function(lastKey) {
                        console.log("Last user's id was: " + lastKey); // Will be 100000.
                    }).catch(Dexie.BulkError, function(e) {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error("Some users did not succeed. However, " +
                            100000 - e.failures.length + " users was added successfully");
                    });
                }

                if (playersTable) {
                    playersTable.bulkPut(request.players).then(function(lastKey) {
                        console.log("Last player's id was: " + lastKey); // Will be 100000.
                    }).catch(Dexie.BulkError, function(e) {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error("Some players did not succeed. However, " +
                            100000 - e.failures.length + " players was added successfully");
                    });
                }

                if (worldTable) {
                    worldTable.put(request.world).then(function(lastKey) {
                        console.log("Last world's id was: " + lastKey); // Will be 100000.
                    }).catch(Dexie.Error, function(e) {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error("Some worlds did not succeed. However, " +
                            100000 - e.failures.length + " worlds was added successfully");
                    });
                }

                if (teamsTable) {
                    teamsTable.bulkPut(request.teams).then(function(lastKey) {
                        console.log("Last teams's id was: " + lastKey); // Will be 100000.
                    }).catch(Dexie.BulkError, function(e) {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error("Some teams did not succeed. However, " +
                            100000 - e.failures.length + " teams was added successfully");
                    });
                }

                if (leaguesTable) {
                    leaguesTable.bulkPut(request.leagues).then(function(lastKey) {
                        console.log("Last leagues's id was: " + lastKey); // Will be 100000.
                    }).catch(Dexie.BulkError, function(e) {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error("Some leagues did not succeed. However, " +
                            100000 - e.failures.length + " leagues was added successfully");
                    });
                }

                if (champsTable) {
                    db.champions.bulkPut(request.champions).then(function(lastKey) {
                        console.log("Last champion id was: " + lastKey); // Will be 100000.
                    }).catch(Dexie.BulkError, function(e) {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error("Some teams did not succeed. However, " +
                            100000 - e.failures.length + " teams was added successfully");
                    });
                }

                if (counterTable) {
                    db.counters.bulkPut(request.counters).then(function(lastKey) {
                        console.log("Last counter id was: " + lastKey); // Will be 100000.
                    }).catch(Dexie.BulkError, function(e) {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error("Some teams did not succeed. However, " +
                            100000 - e.failures.length + " teams was added successfully");
                    });
                }

                if (synergysTable){
                    db.synergys.bulkPut(request.synergys).then(function(lastKey) {
                        console.log("Last synergy id was: " + lastKey); // Will be 100000.
                    }).catch(Dexie.BulkError, function(e) {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error("Some teams did not succeed. However, " +
                            100000 - e.failures.length + " teams was added successfully");
                    });
                }

                // if (attributesTable) {
                //     attributesTable.bulkPut(request.attributes).then(function(lastKey) {
                //         console.log("Last attribute's id was: " + lastKey); // Will be 100000.
                //     }).catch(Dexie.BulkError, function(e) {
                //         // Explicitely catching the bulkAdd() operation makes those successful
                //         // additions commit despite that there were errors.
                //         console.error("Some teams did not succeed. However, " +
                //             100000 - e.failures.length + " teams was added successfully");
                //     });
                // }
                //
                // if (bornTable) {
                //     bornTable.bulkPut(request.born).then(function(lastKey) {
                //         console.log("Last born id was: " + lastKey); // Will be 100000.
                //     }).catch(Dexie.BulkError, function(e) {
                //         // Explicitely catching the bulkAdd() operation makes those successful
                //         // additions commit despite that there were errors.
                //         console.error("Some teams did not succeed. However, " +
                //             100000 - e.failures.length + " teams was added successfully");
                //     });
                // }
                //
                // if (contractTable) {
                //     contractTable.bulkPut(request.contract).then(function(lastKey) {
                //         console.log("Last contract id was: " + lastKey); // Will be 100000.
                //     }).catch(Dexie.BulkError, function(e) {
                //         // Explicitely catching the bulkAdd() operation makes those successful
                //         // additions commit despite that there were errors.
                //         console.error("Some teams did not succeed. However, " +
                //             100000 - e.failures.length + " teams was added successfully");
                //     });
                // }
                //
                // if (salariesTable) {
                //     salariesTable.bulkPut(request.salaries).then(function(lastKey) {
                //         console.log("Last salaries id was: " + lastKey); // Will be 100000.
                //     }).catch(Dexie.BulkError, function(e) {
                //         // Explicitely catching the bulkAdd() operation makes those successful
                //         // additions commit despite that there were errors.
                //         console.error("Some teams did not succeed. However, " +
                //             100000 - e.failures.length + " teams was added successfully");
                //     });
                // }
                //
                // if (statsTable) {
                //     statsTable.bulkPut(request.stats).then(function(lastKey) {
                //         console.log("Last stats id was: " + lastKey); // Will be 100000.
                //     }).catch(Dexie.BulkError, function(e) {
                //         // Explicitely catching the bulkAdd() operation makes those successful
                //         // additions commit despite that there were errors.
                //         console.error("Some teams did not succeed. However, " +
                //             100000 - e.failures.length + " teams was added successfully");
                //     });
                // }

            } catch (err) {
                console.log("Error: " + err)
            } finally {
                return db;
            }
        }
    }

    handleDeleteCareer(db) {
        Dexie.delete(db).then(() => {
            console.log("Database successfully deleted");
        }).catch((err) => {
            console.error("Could not delete database");
        }).finally(() => {
            return;
        });
    }
}
