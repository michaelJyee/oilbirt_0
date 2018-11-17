--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account; Type: TABLE; Schema: public; Owner: it_oilbirt; Tablespace: 
--

CREATE TABLE account (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    email character varying(355) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_login timestamp without time zone
);


ALTER TABLE public.account OWNER TO it_oilbirt;

--
-- Name: account_user_id_seq; Type: SEQUENCE; Schema: public; Owner: it_oilbirt
--

CREATE SEQUENCE account_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_user_id_seq OWNER TO it_oilbirt;

--
-- Name: account_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: it_oilbirt
--

ALTER SEQUENCE account_user_id_seq OWNED BY account.user_id;


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: it_oilbirt; Tablespace: 
--

CREATE TABLE contacts (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    type character varying(255),
    stage character varying(255),
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.contacts OWNER TO it_oilbirt;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: it_oilbirt
--

CREATE SEQUENCE contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO it_oilbirt;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: it_oilbirt
--

ALTER SEQUENCE contacts_id_seq OWNED BY contacts.id;


--
-- Name: lists; Type: TABLE; Schema: public; Owner: it_oilbirt; Tablespace: 
--

CREATE TABLE lists (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    querymodel character varying(1000),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdAt" timestamp without time zone
);


ALTER TABLE public.lists OWNER TO it_oilbirt;

--
-- Name: lists2_id_seq; Type: SEQUENCE; Schema: public; Owner: it_oilbirt
--

CREATE SEQUENCE lists2_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lists2_id_seq OWNER TO it_oilbirt;

--
-- Name: lists2_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: it_oilbirt
--

ALTER SEQUENCE lists2_id_seq OWNED BY lists.id;


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: it_oilbirt
--

ALTER TABLE ONLY account ALTER COLUMN user_id SET DEFAULT nextval('account_user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: it_oilbirt
--

ALTER TABLE ONLY contacts ALTER COLUMN id SET DEFAULT nextval('contacts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: it_oilbirt
--

ALTER TABLE ONLY lists ALTER COLUMN id SET DEFAULT nextval('lists2_id_seq'::regclass);


--
-- Name: account_email_key; Type: CONSTRAINT; Schema: public; Owner: it_oilbirt; Tablespace: 
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_email_key UNIQUE (email);


--
-- Name: account_pkey; Type: CONSTRAINT; Schema: public; Owner: it_oilbirt; Tablespace: 
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pkey PRIMARY KEY (user_id);


--
-- Name: account_username_key; Type: CONSTRAINT; Schema: public; Owner: it_oilbirt; Tablespace: 
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_username_key UNIQUE (username);


--
-- Name: contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: it_oilbirt; Tablespace: 
--

ALTER TABLE ONLY contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: lists2_pkey; Type: CONSTRAINT; Schema: public; Owner: it_oilbirt; Tablespace: 
--

ALTER TABLE ONLY lists
    ADD CONSTRAINT lists2_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: michaelyee
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM michaelyee;
GRANT ALL ON SCHEMA public TO michaelyee;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

