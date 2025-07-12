"""Update Event model fields

Revision ID: 2e8ec09b8754
Revises: 333a600202ed
Create Date: 2025-07-08 22:13:06.793283

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '2e8ec09b8754'
down_revision = '333a600202ed'
branch_labels = None
depends_on = None


def column_exists(table_name, column_name):
    conn = op.get_bind()
    insp = sa.inspect(conn)
    return column_name in [col['name'] for col in insp.get_columns(table_name)]


def upgrade():
    # Add columns only if they don't exist
    with op.batch_alter_table('events', schema=None) as batch_op:
        for col, coltype in [
            ('position', sa.String(length=50)),
            ('datetime', sa.String(length=100)),
            ('organizer', sa.String(length=200)),
            ('followers', sa.String(length=50)),
            ('event_link', sa.String(length=500)),
            ('image', sa.String(length=500)),
            ('image_description', sa.Text()),
            ('source_api', sa.String(length=100)),
            ('rating', sa.String(length=20)),
            ('attendees_count', sa.String(length=20)),
            ('attendee_image_1', sa.String(length=500)),
            ('attendee_image_2', sa.String(length=500)),
            ('attendee_image_3', sa.String(length=500)),
        ]:
            if not column_exists('events', col):
                batch_op.add_column(sa.Column(col, coltype, nullable=True))
        # Alter price column only if it exists and is not already String
        if column_exists('events', 'price'):
            conn = op.get_bind()
            insp = sa.inspect(conn)
            price_col = [c for c in insp.get_columns('events') if c['name'] == 'price'][0]
            if not isinstance(price_col['type'], sa.String):
                batch_op.alter_column('price',
                    existing_type=mysql.FLOAT(),
                    type_=sa.String(length=50),
                    existing_nullable=True)
        # Drop columns only if they exist
        for col in ['date', 'time']:
            if column_exists('events', col):
                batch_op.drop_column(col)

def downgrade():
    with op.batch_alter_table('events', schema=None) as batch_op:
        # Add back date and time columns if not present
        if not column_exists('events', 'time'):
            batch_op.add_column(sa.Column('time', mysql.TIME(), nullable=True))
        if not column_exists('events', 'date'):
            batch_op.add_column(sa.Column('date', sa.DATE(), nullable=True))
        # Revert price column only if it exists and is String
        if column_exists('events', 'price'):
            conn = op.get_bind()
            insp = sa.inspect(conn)
            price_col = [c for c in insp.get_columns('events') if c['name'] == 'price'][0]
            if isinstance(price_col['type'], sa.String):
                batch_op.alter_column('price',
                    existing_type=sa.String(length=50),
                    type_=mysql.FLOAT(),
                    existing_nullable=True)
        # Drop new columns if they exist
        for col in [
            'attendee_image_3', 'attendee_image_2', 'attendee_image_1', 'attendees_count',
            'rating', 'source_api', 'image_description', 'image', 'event_link', 'followers',
            'organizer', 'datetime', 'position']:
            if column_exists('events', col):
                batch_op.drop_column(col)
