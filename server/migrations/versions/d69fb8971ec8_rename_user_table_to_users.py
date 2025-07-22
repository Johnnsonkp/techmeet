"""Rename user table to users

Revision ID: d69fb8971ec8
Revises: 
Create Date: 2025-06-09 00:34:52.604288

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect

# revision identifiers, used by Alembic.
revision = 'd69fb8971ec8'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    bind = op.get_bind()
    inspector = inspect(bind)

    # Rename 'user' to 'users' if it exists
    if 'user' in inspector.get_table_names():
        op.rename_table('user', 'users')

    # Rename 'profile' to 'profiles' if it exists
    if 'profile' in inspector.get_table_names():
        op.rename_table('profile', 'profiles')
        with op.batch_alter_table('profiles', schema=None) as batch_op:
            # Drop foreign key constraint if it exists
            for constraint in inspector.get_foreign_keys('profiles'):
                if constraint['name']:
                    batch_op.drop_constraint(constraint['name'], type_='foreignkey')
            batch_op.create_foreign_key('profiles_user_id_fkey', 'users', ['user_id'], ['id'])

    # Ensure unique index on 'email' in 'users' table
    if 'users' in inspector.get_table_names():
        with op.batch_alter_table('users', schema=None) as batch_op:
            # Check if index exists before dropping
            indexes = [idx['name'] for idx in inspector.get_indexes('users')]
            if 'email' in indexes:
                batch_op.drop_index('email')
            batch_op.create_index('email', ['email'], unique=True)

def downgrade():
    bind = op.get_bind()
    inspector = inspect(bind)

    # Revert table renames
    if 'users' in inspector.get_table_names():
        op.rename_table('users', 'user')
    if 'profiles' in inspector.get_table_names():
        op.rename_table('profiles', 'profile')
        with op.batch_alter_table('profile', schema=None) as batch_op:
            for constraint in inspector.get_foreign_keys('profile'):
                if constraint['name']:
                    batch_op.drop_constraint(constraint['name'], type_='foreignkey')
            batch_op.create_foreign_key('profile_user_id_fkey', 'user', ['user_id'], ['id'])

    # Recreate tables with SQLite-compatible schema
    op.create_table('user',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('first_name', sa.String(length=50), nullable=True),
        sa.Column('last_name', sa.String(length=50), nullable=True),
        sa.Column('email', sa.String(length=120), nullable=False),
        sa.Column('address', sa.String(length=200), nullable=True),
        sa.Column('password', sa.String(length=128), nullable=True),
        sa.Column('is_admin', sa.Boolean(), nullable=False),
        sa.Column('employment_status', sa.String(length=50), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('profile',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('job_title', sa.String(length=120), nullable=True),
        sa.Column('skills', sa.JSON(), nullable=True),
        sa.Column('personality', sa.JSON(), nullable=True),
        sa.Column('bio', sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='profile_user_id_fkey'),
        sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index('email', ['email'], unique=True)