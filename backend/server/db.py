"""
Expose Flask builtin SQLite database interface.

Provides utilities to open and close a connection, initialize the database
based on Flask params, and register a command to initialize the database.

Based on tutorial file in http://flask.pocoo.org/docs/1.0/tutorial/database/
"""
import sqlite3

import click
from flask import current_app, g, Flask
from flask.cli import with_appcontext

def get_db() -> sqlite3.Connection:
    """
    Returns a configured connection to the database.

    If there is already an open connection for the instance running, 
    just return that. 
    """
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        # Tells g to return rows as dictionaries. Lets you reference columns by name
        g.db.row_factory = sqlite3.Row
    
    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    
    if db is not None:
        db.close()


def init_db():
    """
    Initialize database schema using local schema file.
    WARNING: DUMPS OLD DATABASE!
    """
    db = get_db()
    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Packages init_db as a Flask command to run as 'flask init-db' """
    init_db()
    click.echo("Initialized the database")


def db_init_app(app: Flask):
    """Closes db connections upon shutdown and registers init-db command"""
    # Register the database shutdown function
    app.teardown_appcontext(close_db)

    # Add command "init-db" to command line tools
    app.cli.add_command(init_db_command)
