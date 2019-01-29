const dropUsers = 'DROP TABLE IF EXISTS users CASCADE';
const dropParties = 'DROP TABLE IF EXISTS parties CASCADE';
const dropOffices = 'DROP TABLE IF EXISTS offices CASCADE';
const dropCandidates = 'DROP TABLE IF EXISTS candidates CASCADE';
const dropVotes = 'DROP TABLE IF EXISTS votes CASCADE';
const destroyTablesQuery = `${dropUsers}${dropParties}${dropOffices}${dropCandidates}${dropVotes}`;

export default destroyTablesQuery;
