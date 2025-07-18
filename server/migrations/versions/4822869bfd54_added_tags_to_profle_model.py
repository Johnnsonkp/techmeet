"""Added tags to profle model

Revision ID: 4822869bfd54
Revises: 5db4699a4255
Create Date: 2025-06-26 21:35:39.624182

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4822869bfd54'
down_revision = '5db4699a4255'
branch_labels = None
depends_on = None


def upgrade():
    from sqlalchemy import inspect
    bind = op.get_bind()
    inspector = inspect(bind)
    profile_columns = [col['name'] for col in inspector.get_columns('profiles')]
    with op.batch_alter_table('profiles', schema=None) as batch_op:
        if 'tags' not in profile_columns:
            batch_op.add_column(sa.Column('tags', sa.JSON(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    from sqlalchemy import inspect
    bind = op.get_bind()
    inspector = inspect(bind)
    profile_columns = [col['name'] for col in inspector.get_columns('profiles')]
    with op.batch_alter_table('profiles', schema=None) as batch_op:
        if 'tags' in profile_columns:
            batch_op.drop_column('tags')

    # ### end Alembic commands ###
