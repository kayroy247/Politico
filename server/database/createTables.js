const users = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR (50) NOT NULL,
    lastname VARCHAR (50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    passport_url VARCHAR(100) DEFAULT 'http://com.com' NOT NULL,
    isadmin BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
  );
`;

const parties = `
  CREATE TABLE IF NOT EXISTS parties(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR (200) NOT NULL,
    hq_address VARCHAR (200) NOT NULL,
    logo_url VARCHAR(200) DEFAULT 'http://pic.com' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() 
  );
`;

const offices = `
  CREATE TABLE IF NOT EXISTS offices(
    id SERIAL PRIMARY KEY NOT NULL,
    type VARCHAR (200) NOT NULL,
    name VARCHAR (50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
  );
`;

const candidates = `
  CREATE TABLE IF NOT EXISTS candidates(
    id SERIAL NOT NULL,
    office INTEGER NOT NULL REFERENCES offices (id),
    party INTEGER NOT NULL REFERENCES parties (id) ON DELETE CASCADE,
    candidate INTEGER NOT NULL REFERENCES users (id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    PRIMARY KEY (candidate, office)
  );
`;

const votes = `
  CREATE TABLE IF NOT EXISTS votes(
    id SERIAL NOT NULL,
    office INTEGER NOT NULL REFERENCES offices (id),
    candidate INTEGER NOT NULL REFERENCES users (id),
    voter INTEGER NOT NULL REFERENCES users (id),
    created_on TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    PRIMARY KEY (office, voter)
  );
`;
const createTables = `${users}${parties}${offices}${candidates}${votes}`;

export default createTables;
