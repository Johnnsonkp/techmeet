"""Add profile_id to users

Revision ID: d690eefe04e4
Revises: d69fb8971ec8
Create Date: 2025-06-23 15:57:13.119704

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'd690eefe04e4'
down_revision = 'd69fb8971ec8'
branch_labels = None
depends_on = None



def upgrade():
    from sqlalchemy import inspect
    bind = op.get_bind()
    inspector = inspect(bind)

    # OPTIONAL: If you're refactoring `category_tags`
    category_tag_columns = [col['name'] for col in inspector.get_columns('category_tags')]
    if 'category_id' not in category_tag_columns:
        with op.batch_alter_table('category_tags', schema=None) as batch_op:
            batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=False))
            batch_op.create_foreign_key(None, 'categories', ['category_id'], ['id'])

    # OPTIONAL: If you're refactoring `events`
    event_columns = [col['name'] for col in inspector.get_columns('events')]
    if 'source_api_id' not in event_columns:
        with op.batch_alter_table('events', schema=None) as batch_op:
            batch_op.add_column(sa.Column('source_api_id', sa.Integer(), nullable=True))
            batch_op.create_foreign_key(None, 'source_apis', ['source_api_id'], ['id'])

    # Remove old user_id foreign key from `profiles` if it's no longer used
    profile_columns = [col['name'] for col in inspector.get_columns('profiles')]
    with op.batch_alter_table('profiles', schema=None) as batch_op:
        if 'user_id' in profile_columns:
            batch_op.drop_constraint(batch_op.f('profiles_ibfk_1'), type_='foreignkey')
            batch_op.drop_column('user_id')

    # THE MAIN INTENDED CHANGE — Add `profile_id` to `users`
    user_columns = [col['name'] for col in inspector.get_columns('users')]
    with op.batch_alter_table('users', schema=None) as batch_op:
        if 'profile_id' not in user_columns:
            batch_op.add_column(sa.Column('profile_id', sa.Integer(), nullable=True))
            batch_op.create_foreign_key('fk_users_profile_id_profiles', 'profiles', ['profile_id'], ['id'])

    # ### end Alembic commands ###



def downgrade():
    from sqlalchemy import inspect
    bind = op.get_bind()
    inspector = inspect(bind)
    user_columns = [col['name'] for col in inspector.get_columns('users')]
    with op.batch_alter_table('users', schema=None) as batch_op:
        if 'profile_id' in user_columns:
            batch_op.drop_constraint('fk_users_profile_id_profiles', type_='foreignkey')
            batch_op.drop_column('profile_id')
    profile_columns = [col['name'] for col in inspector.get_columns('profiles')]
    with op.batch_alter_table('profiles', schema=None) as batch_op:
        if 'user_id' not in profile_columns:
            batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
            batch_op.create_foreign_key(batch_op.f('profiles_ibfk_1'), 'users', ['user_id'], ['id'])
    event_columns = [col['name'] for col in inspector.get_columns('events')]
    with op.batch_alter_table('events', schema=None) as batch_op:
        if 'source_api_id' in event_columns:
            batch_op.drop_constraint(None, type_='foreignkey')
            batch_op.drop_column('source_api_id')
    category_tag_columns = [col['name'] for col in inspector.get_columns('category_tags')]
    with op.batch_alter_table('category_tags', schema=None) as batch_op:
        if 'category_id' in category_tag_columns:
            batch_op.drop_constraint(None, type_='foreignkey')
            batch_op.drop_column('category_id')

    # ### end Alembic commands ###
