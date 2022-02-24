// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

(() => {
    /**
     * Class representing a report
     * @memberof module:API.cvat.classes
     * @hideconstructor
     */
    class Reports {
        constructor(initialData) {
            const data = {
                id: null,
                name: null,
                owner_id: null,
                assignee_id: null,
                bug_tracker: null,
                created_date: null,
                updated_date: null,
                date_joined: null,
                status: null,
                training_project_id: null,
                project_description: null,
                start_date: null,
                project_type: null,
            };

            for (const property in data) {
                if (Object.prototype.hasOwnProperty.call(data, property) && property in initialData) {
                    data[property] = initialData[property];
                }
            }

            Object.defineProperties(
                this,
                Object.freeze({
                    id: {
                        /**
                         * @name id
                         * @type {integer}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.id,
                    },
                    name: {
                        /**
                         * @name name
                         * @type {string}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.name ,
                    },
                    ownerId: {
                        /**
                         * @name owner_id
                         * @type {integer}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.owner_id,
                    },
                    assigneeId: {
                        /**
                         * @name assignee_id
                         * @type {integer}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.assignee_id,
                    },
                    bugTracker: {
                        /**
                         * @name bug_tracker
                         * @type {string}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.bug_tracker,
                    },
                    createdDate: {
                        /**
                         * @name created_date
                         * @type {Date}}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.created_date,
                    },
                    updatedDate: {
                        /**
                         * @name updated_date
                         * @type {Date}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.updated_date,
                    },
                    status: {
                        /**
                         * @name status
                         * @type {string}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.status,
                    },
                    trainingProjectId: {
                        /**
                         * @name trainingProjectId
                         * @type {integer}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.training_project_id,
                    },
                    projectDescription: {
                        /**
                         * @name projectDescription
                         * @type {string}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.project_description,
                    },
                    startDate: {
                        /**
                         * @name startDate
                         * @type {Date}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.start_date,
                    },
                    projectType: {
                        /**
                         * @name projectType
                         * @type {string}
                         * @memberof module:API.cvat.classes.Reports
                         * @readonly
                         * @instance
                         */
                        get: () => data.project_type,
                    },
                }),
            );
        }

        serialize() {
            return {
                id: this.id,
                name: this.name,
                owner_id: this.ownerId,
                assignee_id: this.assigneeId,
                bug_tracker: this.bugTracker,
                created_date: this.createdDate,
                updated_date: this.updatedDate,
                date_joined: this.dateJoined,
                status: this.status,
                training_project_id: this.trainingProjectId,
                project_description: this.projectDescription,
                start_date: this.startDate,
                project_type: this.projectType,
            };
        }

        toJSON() {
            return this.serialize();
        }
    }

    module.exports = Reports;
})();
